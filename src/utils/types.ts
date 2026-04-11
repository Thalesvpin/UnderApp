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