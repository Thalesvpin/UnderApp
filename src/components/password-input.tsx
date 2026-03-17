import { TextInput } from "react-native";

export function PasswordInput({...rest}){
	return <TextInput secureTextEntry style={{borderWidth: 1, borderColor: '#0011ff53', borderRadius: 10, padding: 10, marginBottom: 15}} {...rest} />
}