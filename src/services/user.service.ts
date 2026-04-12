import { UpdateUserInfo, UserInfo } from '@/utils/types';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;


async function getUserInfo() {
	const token = await SecureStore.getItemAsync('token');

	const response = await fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	if (!response.ok){
		const {error} = await response.json();
		throw new Error(error);
	}
	const {data} = await response.json();
	return data;
}

async function updateUserInfo(payload: UpdateUserInfo) {
	const token = await SecureStore.getItemAsync('token');
	
	const response = await fetch(`${BASE_URL}/users/me`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(payload),
	});
	if (!response.ok){
		const {error} = await response.json();
		throw new Error(error);
	}
	const {data} = await response.json();
	return data;
}

async function deleteUser() {
	const token = await SecureStore.getItemAsync('token');
	
	const response = await fetch(`${BASE_URL}/users/me`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	});
	if (!response.ok){
		const {error} = await response.json();
		throw new Error(error);
	}
	const {data} = await response.json();
	return data;
}

const UserService = {
	getUserInfo,
	updateUserInfo,
	deleteUser,
};

export default UserService;
