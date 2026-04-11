import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export type UserInfo = {
	firstName?: string;
	lastName?: string;
	email?: string;
	cep?: string;
	// cpf?: string;
};

async function getUserInfo() {
	const token = await SecureStore.getItemAsync('token');

	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
}

async function updateUserInfo(payload: UserInfo) {
	const token = await SecureStore.getItemAsync('token');
	
	return fetch(`${BASE_URL}/users/me`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(payload),
	});
}

async function deleteUser() {
	const token = await SecureStore.getItemAsync('token');
	
	return fetch(`${BASE_URL}/users/me`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	});
}

const UserService = {
	getUserInfo,
	updateUserInfo,
	deleteUser,
};

export default UserService;
