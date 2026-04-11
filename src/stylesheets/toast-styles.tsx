import { BaseToast } from "react-native-toast-message";

const TEXT = '#fff';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#06a800',
        borderLeftWidth: 0,
        borderRadius: 8,
				width: '70%',
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.25,
				shadowRadius: 4,
				elevation: 5,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ color: TEXT, fontSize: 15 }}
      text2Style={{ color: TEXT, fontSize: 13, opacity: 0.9 }}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#fc0330',
        borderLeftWidth: 0,
        borderRadius: 8,
				width: '70%',
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.25,
				shadowRadius: 4,
				elevation: 5,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{ color: TEXT, fontSize: 15 }}
      text2Style={{ color: TEXT, fontSize: 13, opacity: 0.9 }}
    />
  ),
};