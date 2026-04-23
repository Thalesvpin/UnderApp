import { colorBlue, colorGreen, colorPurple, globalStyles } from "@/stylesheets/global-stylesheet";
import { CEP_REGEX, EMAIL_REGEX, NAME_REGEX } from "@/utils/regex";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CepInput } from "../molecules/inputs/cep-input";
import { EmailInput } from "../molecules/inputs/email-input";
import { NameInput } from "../molecules/inputs/name-input";
import { LoaderButton } from "../molecules/loader-button";
import { UpdateUserInfo, UserInfo } from "@/utils/types";
import { IconWithBackground } from "../atoms/icon-with-background";

type EditProfileFormProps = {
  userInfo: UserInfo;
  onSubmit: (newUserInfo: UpdateUserInfo) => void;
};
export function EditProfileForm({ userInfo, onSubmit }: EditProfileFormProps) {
  const [newUserInfo, setNewUserInfo] = useState<UpdateUserInfo>({firstName: '', lastName: '', email: '', cep: ''});
  const [isLoading, setIsLoading] = useState(false);

	const iconSize = 30;

	useEffect(() => {
		setNewUserInfo(userInfo);
	}, [userInfo]);

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmit(newUserInfo);
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
        <View style={styles.fieldContainer}>
					<IconWithBackground icon="person-outline" iconColor={colorBlue} iconSize={iconSize} />
					<View style={styles.fieldText}>
						<Text>Nome</Text>
						<NameInput
							value={newUserInfo.firstName}
							onChangeText={(text) =>
								setNewUserInfo({ ...newUserInfo, firstName: text })
							}
							placeholder="Nome"
						/>
					</View>
				</View>

        <View style={styles.fieldContainer}>
					<IconWithBackground icon="person-outline" iconColor={colorBlue} iconSize={iconSize} />
					<View style={styles.fieldText}>
						<Text>Sobrenome</Text>
						<NameInput
							value={newUserInfo.lastName}
							onChangeText={(text) =>
								setNewUserInfo({ ...newUserInfo, lastName: text })
							}
							placeholder="Sobrenome"
						/>
					</View>
				</View>

        <View style={styles.fieldContainer}>
					<IconWithBackground icon="mail-outline" iconColor={colorPurple} iconSize={iconSize} />
					<View style={styles.fieldText}>
						<Text>Email</Text>
						<EmailInput
							value={newUserInfo.email}
							onChangeText={(text) =>
								setNewUserInfo({ ...newUserInfo, email: text })
							}
							placeholder="Email"
							keyboardType="email-address"
							regex={true}
						/>
					</View>
				</View>

        {/* <View style={globalStyles.inputIcon}>
					<Ionicons name="person" size={20} color="gray" />
					<Text>CPF</Text>
				</View>
				<Input value={newUserInfo.cpf} style={{color: 'gray'}} editable={false} placeholder='CPF do usuário' keyboardType='numeric'/> */}

        <View style={styles.fieldContainer}>
					<IconWithBackground icon="location-outline" iconColor={colorGreen} iconSize={iconSize} />
					<View style={styles.fieldText}>
						<Text>CEP</Text>
						<CepInput
							value={newUserInfo.cep}
							onChangeText={(text) => setNewUserInfo({ ...newUserInfo, cep: text })}
							placeholder="CEP do usuário"
							keyboardType="numeric"
							regex={true}
						/>
					</View>
				</View>

        {/* <Button label="Salvar" /> */}

        <View style={globalStyles.hCenter}>
          <LoaderButton
            label="Salvar"
						icon="save-outline"
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
    width: "100%",
  },
	fieldContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginBottom: 20,
	},
	fieldText: {
		flex: 1,
	},
	icon:{
		width: 32,
		height: 32,
	}
});
