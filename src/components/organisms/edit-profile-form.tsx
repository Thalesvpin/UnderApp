import { globalStyles } from "@/stylesheets/global-stylesheet";
import { CEP_REGEX, EMAIL_REGEX, NAME_REGEX } from "@/utils/regex";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CepInput } from "../molecules/inputs/cep-input";
import { EmailInput } from "../molecules/inputs/email-input";
import { NameInput } from "../molecules/inputs/name-input";
import { LoaderButton } from "../molecules/loader-button";
import { UpdateUserInfo, UserInfo } from "@/utils/types";

type EditProfileFormProps = {
  userInfo: UserInfo;
  onSubmit: (newUserInfo: UpdateUserInfo) => void;
};
export function EditProfileForm({ userInfo, onSubmit }: EditProfileFormProps) {
  const [newUserInfo, setNewUserInfo] = useState<UpdateUserInfo>({firstName: '', lastName: '', email: '', cep: ''});
  const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setNewUserInfo(userInfo);
	}, [userInfo]);

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmit(newUserInfo ?? {});
    setIsLoading(false);
  };

  const isFormValid = () => {
    const emailValid =
      EMAIL_REGEX.test(newUserInfo.email) && newUserInfo.email !== "";
    const nameValid =
      NAME_REGEX.test(newUserInfo.firstName) && newUserInfo.firstName !== "";
    const lastNameValid =
      NAME_REGEX.test(newUserInfo.lastName) && newUserInfo.lastName !== "";
    const cepValid =
      CEP_REGEX.test(newUserInfo.cep) &&
      newUserInfo.cep !== "";
    return emailValid && nameValid && lastNameValid && cepValid;
  };

  return (
    <View style={globalStyles.cardBg}>
      <View style={styles.formGroup}>
        <View style={globalStyles.inputIcon}>
          <Ionicons name="person" size={22} color="gray" />
          <Text>Nome</Text>
        </View>
        <NameInput
          value={newUserInfo.firstName}
          onChangeText={(text) =>
            setNewUserInfo({ ...newUserInfo, firstName: text })
          }
          placeholder="Nome"
        />

        <View style={globalStyles.inputIcon}>
          <Ionicons name="person" size={22} color="gray" />
          <Text>Sobrenome</Text>
        </View>
        <NameInput
          value={newUserInfo.lastName}
          onChangeText={(text) =>
            setNewUserInfo({ ...newUserInfo, lastName: text })
          }
          placeholder="Sobrenome"
        />

        <View style={globalStyles.inputIcon}>
          <Ionicons name="mail" size={22} color="gray" />
          <Text>Email</Text>
        </View>
        <EmailInput
          value={newUserInfo.email}
          onChangeText={(text) =>
            setNewUserInfo({ ...newUserInfo, email: text })
          }
          placeholder="Email"
          keyboardType="email-address"
          regex={true}
        />

        {/* <View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={20} color="gray" />
					<Text>CPF</Text>
				</View>
				<Input value={newUserInfo.cpf} style={{color: 'gray'}} editable={false} placeholder='CPF do usuário' keyboardType='numeric'/> */}

        <View style={globalStyles.inputIcon}>
          <Ionicons name="location" size={20} color="gray" />
          <Text>CEP</Text>
        </View>
        <CepInput
          value={newUserInfo.cep}
          onChangeText={(text) => setNewUserInfo({ ...newUserInfo, cep: text })}
          placeholder="CEP do usuário"
          keyboardType="numeric"
          regex={true}
        />

        {/* <Button label="Salvar" /> */}

        <View style={globalStyles.hCenter}>
          <LoaderButton
            label="Salvar"
            loadingText="Salvando..."
            isLoading={isLoading}
            onPress={handleSubmit}
            disabled={!isFormValid()}
          ></LoaderButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    width: "93%",
  },
});
