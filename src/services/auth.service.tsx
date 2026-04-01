const API_BASE_URL = 'https://localhost:';

const endpoints = {
	login: `${API_BASE_URL}/auth/login`,
	signup: `${API_BASE_URL}/auth/signup`,
	resetPassword: `${API_BASE_URL}/auth/reset-password`,
} as const;

export type LoginPayload = {
	email: string;
	password: string;
};

export type SignupPayload = {
	email: string;
	password: string;
	cpf: string;
	cep: string;
};

export type ResetPasswordPayload = {
	email: string;
};

async function login(payload: LoginPayload) {
	return fetch(endpoints.login, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
}

async function signup(payload: SignupPayload) {
	return fetch(endpoints.signup, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
}

async function resetPassword(payload: ResetPasswordPayload) {
	return fetch(endpoints.resetPassword, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
}

const AuthService = {
	login,
	signup,
	resetPassword,
};

export default AuthService;
