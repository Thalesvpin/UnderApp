const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export type LoginPayload = {
	email: string;
	password: string;
};

export type SignupPayload = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	cep: string;
	// cpf: string;
};

async function login(payload: LoginPayload) {
	return fetch(`${BASE_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
}

async function signup(payload: SignupPayload) {
	return fetch(`${BASE_URL}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
}

const AuthService = {
	login,
	signup,
};

export default AuthService;
