import { TextInput, TextInputProps } from "react-native"

export function Input({style, ...rest}: TextInputProps){
	return <TextInput style={[styles.input, style]} {...rest} />
}

const styles = {
	input:{
		borderWidth: 1,
		borderColor: '#0011ff53',
		borderRadius: 10,
		padding: 10,
		marginBottom: 15,
	}
}