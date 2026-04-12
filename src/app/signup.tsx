import { SignupForm } from "@/components/organisms/signup-form";
import AuthService from "@/services/auth.service";
import { globalStyles } from "@/stylesheets/global-stylesheet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
	StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";

export default function Signup() {
  // function handleSignUp(email: string, password: string, firstName: string, lastName: string, cep: string){
  // 	console.log('Signing up...')
  // 	AuthService.signup({ email, password, firstName, lastName, cep })
  // 		.then(async (response) => {
  // 			const {data} = await response.json();
  // 			if(response.ok){
  // 				Toast.show({
  // 					type: 'success',
  // 					text1: 'Cadastro realizado com sucesso',
  // 				});
  // 				router.replace("/login");
  // 			}else{
  // 				Toast.show({
  // 					type: 'error',
  // 					text1: 'Erro ao cadastrar',
  // 					text2: 'Por favor, tente novamente',
  // 				});
  // 			}
  // 		})
  // 	;
  // }

  async function handleSignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    cep: string,
  ) {
    try {
      const response = await AuthService.signup({
        email,
        password,
        firstName,
        lastName,
        cep,
      });
      const { data } = await response.json();
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Cadastro realizado com sucesso",
        });
        router.replace("/login");
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao cadastrar",
          text2: "Por favor, tente novamente",
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar",
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
				<Ionicons name="arrow-back" size={24} color="black" onPress={() => router.back()} style={styles.backButton} />
        <View style={globalStyles.loginSignupContainer}>
          <Image
            style={globalStyles.logo}
            source={require("@/assets/logo.png")}
          />
          <Text style={globalStyles.title}>Cadastro</Text>

          <SignupForm onSubmit={handleSignUp} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});