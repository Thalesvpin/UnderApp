import { Ionicons } from "@expo/vector-icons";

export type UserInfo = {
	firstName: string;
	lastName: string;
	email: string;
	// cpf: string;
	cep: string;
	profileImageUrl: string;
};

export type UpdateUserInfo = {
	firstName: string;
	lastName: string;
	email: string;
	// cpf?: string;
	cep: string;
};

export type MarkerData = {
	id: number;
	icon: keyof typeof Ionicons.glyphMap;
	severity: string,
	latitude: number;
	longitude: number;
	title: string;
	description: string;
};