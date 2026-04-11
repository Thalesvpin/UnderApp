import { LoginForm } from "@/components/organisms/login-form";
import AuthService from "@/services/auth.service";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { AuthContext } from "@/utils/authContext";
import * as SecureStore from "expo-secure-store";
import { useContext, useState } from "react";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function Login() {
  const [isReady, setIsReady] = useState(false);
  const authContext = useContext(AuthContext);

  const checkUserLoggedIn = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token !== null && token !== undefined) {
      return JSON.parse(token);
    } else {
      return null;
    }
  };

  async function handleSignIn(email: string, password: string) {
    try {
      const response = await AuthService.login({ email, password });
      const { data } = await response.json();
      if (response.ok && data.token) {
        authContext.logIn(data.token);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao fazer login",
          text2: "Por favor, tente novamente",
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Por favor, tente novamente",
      });
    }
  }

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }]}
      behavior={Platform.select({ ios: "padding", android: "padding" })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={globalStyles.loginSignupContainer}>
          <Image
            style={globalStyles.logo}
            source={require("@/assets/logo.png")}
          />
          <Text style={globalStyles.title}>Login</Text>

          <LoginForm onSubmit={handleSignIn} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
