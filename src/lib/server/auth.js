import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { JWT_CONFIG } from './config.js';
import { API_MESSAGES } from '$lib/constants/api.js';

export async function requireAuth(cookies) {
	const token = cookies.get(JWT_CONFIG.COOKIE_NAME);
	if (!token) {
		throw error(401, API_MESSAGES.ERRORS.AUTH_REQUIRED);
	}

	try {
		const { userId } = jwt.verify(token, JWT_SECRET);
		return userId;
	} catch {
		throw error(401, API_MESSAGES.ERRORS.INVALID_TOKEN);
	}
}
