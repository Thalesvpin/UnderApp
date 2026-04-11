import React, {
  createContext,
  JSX,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { SCREEN_HEIGHT, SCREEN_WIDTH, SPACING } from "./const";
import type {
  ContentProps,
  DropdownContextValue,
  ItemProps,
  TriggerLayout,
  TriggerProps,
} from "./types";

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined,
);

const useDropdownContext = (): DropdownContextValue => {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error("Dropdown components must be used within a Dropdown");
  return context;
};

interface DropdownProps {
  children: ReactNode;
}

const Dropdown = ({ children }: DropdownProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(
    null,
  );
  const flipAnim = useSharedValue<number>(0);

  const open = (): void => {
    setVisible(true);
    flipAnim.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
      mass: 0.8,
    });
  };

  const close = (): void => {
    flipAnim.value = withTiming(0, {
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.6, 1),
    });
    setTimeout(() => setVisible(false), 200);
  };

  return (
    <DropdownContext.Provider
      value={{
        visible,
        open,
        close,
        triggerLayout,
        setTriggerLayout,
        flipAnim,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

const Trigger = ({ children, style }: TriggerProps): JSX.Element => {
  const { open, setTriggerLayout } = useDropdownContext();
  const triggerRef = useRef<View>(null);

  const handlePress = (): void => {
    triggerRef.current?.measure(
      (
        _x: number,
        _y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        setTriggerLayout({ x: pageX, y: pageY, width, height });
        open();
      },
    );
  };

  return (
    <TouchableOpacity
      ref={triggerRef}
      onPress={handlePress}
      style={style}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

const Content = ({
  children,
  style,
  position = "auto",
}: ContentProps): JSX.Element | null => {
  const { visible, close, triggerLayout, flipAnim } = useDropdownContext();
  const contentRef = useRef<View>(null);
  const [contentDimensions, setContentDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerLayout || !contentDimensions) return { top: 0, left: 0 };

    const { x, y, width, height } = triggerLayout;
    const { width: contentWidth, height: contentHeight } = contentDimensions;

    let top = y + height + SPACING;
    let left = x;

    if (position === "auto") {
      const spaceBelow = SCREEN_HEIGHT - (y + height);
      const spaceAbove = y;

      if (spaceBelow >= contentHeight + SPACING) {
        top = y + height + SPACING;
      } else if (spaceAbove >= contentHeight + SPACING) {
        top = y - contentHeight - SPACING;
      } else {
        top =
          spaceBelow > spaceAbove
            ? y + height + SPACING
            : Math.max(SPACING, y - contentHeight - SPACING);
      }

      if (x + contentWidth > SCREEN_WIDTH - SPACING) {
        left = Math.max(SPACING, x + width - contentWidth);
      }

      if (left < SPACING) left = SPACING;

      if (left + contentWidth > SCREEN_WIDTH - SPACING) {
        left = SCREEN_WIDTH - contentWidth - SPACING;
      }
    } else if (position === "top") {
      top = y - contentHeight - SPACING;
    } else if (position === "bottom") {
      top = y + height + SPACING;
    } else if (position === "left") {
      left = x - contentWidth - SPACING;
      top = y;
    } else if (position === "right") {
      left = x + width + SPACING;
      top = y;
    }

    top = Math.max(
      SPACING,
      Math.min(top, SCREEN_HEIGHT - contentHeight - SPACING),
    );
    left = Math.max(
      SPACING,
      Math.min(left, SCREEN_WIDTH - contentWidth - SPACING),
    );

    return { top, left };
  }, [triggerLayout, contentDimensions, position]);

  const { top, left } = calculatePosition();

  const animatedStyle = useAnimatedStyle(() => {
    const progress = flipAnim.value;

    return {
      opacity: interpolate(progress, [0, 0.5, 1], [0, 0.5, 1]),
      transform: [
        { perspective: 900 },
        {
          scale: interpolate(progress, [0, 1], [0.9, 1]),
        },
      ],
      transformOrigin: "top center",
    };
  });

  if (!visible || !triggerLayout) return null;

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={close}
      animationType="none"
    >
      <View style={styles.overlay} pointerEvents="box-none">
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="Fechar menu"
        />
        <Animated.View
          ref={contentRef}
          collapsable={false}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            setContentDimensions({ width, height });
          }}
          style={[
            styles.content,
            style,
            {
              top: contentDimensions
                ? top
                : triggerLayout.y + triggerLayout.height + SPACING,
              left: contentDimensions ? left : triggerLayout.x,
              minWidth: triggerLayout.width,
            },
            animatedStyle,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const Item = ({ children, onPress, style }: ItemProps): JSX.Element => {
  const { close } = useDropdownContext();

  return (
    <TouchableOpacity
      style={[styles.item, style]}
      activeOpacity={0.85}
      onPress={() => {
        onPress?.();
        close();
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Item = Item;

const styles = StyleSheet.create({
  overlay: { flex: 1 },
  content: {
    position: "absolute",
    zIndex: 1,
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

export default Dropdown;
