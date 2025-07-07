import clientPromise from '$lib/server/db/mongodb.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { json, error } from '@sveltejs/kit';
import { validateUserData } from '$lib/utils/validation.js';
import { createSuccessResponse } from '$lib/utils/apiResponse.js';
import { API_MESSAGES } from '$lib/constants/api.js';
import { DATABASE, getDB, JWT_CONFIG, PASSWORD_CONFIG } from '$lib/server/config.js';

export async function POST({ request, cookies }) {
	try {
		const userData = await request.json();

		const validation = validateUserData(userData, false);
		if (!validation.isValid) {
			throw error(400, validation.errors.join(', '));
		}

		const { email, password, name } = userData;

		const db = await getDB();

		const existingUser = await db.collection(DATABASE.COLLECTIONS.USERS).findOne({
			email: email.toLowerCase().trim()
		});
		if (existingUser) {
			throw error(400, API_MESSAGES.ERRORS.USER_EXISTS);
		}

		const hashedPassword = await bcrypt.hash(password, PASSWORD_CONFIG.BCRYPT_ROUNDS);

		const result = await db.collection(DATABASE.COLLECTIONS.USERS).insertOne({
			email: email.toLowerCase().trim(),
			password: hashedPassword,
			name: name.trim(),
			createdAt: new Date()
		});

		const token = jwt.sign({ userId: result.insertedId.toString() }, JWT_SECRET, {
			expiresIn: JWT_CONFIG.EXPIRES_IN
		});

		cookies.set(JWT_CONFIG.COOKIE_NAME, token, {
			...JWT_CONFIG.COOKIE_OPTIONS
		});

		return json(
			createSuccessResponse(
				{
					user: {
						_id: result.insertedId.toString(),
						email: email.toLowerCase().trim(),
						name: name.trim(),
						createdAt: new Date()
					}
				},
				API_MESSAGES.SUCCESS.REGISTRATION_SUCCESS
			)
		);
	} catch (err) {
		console.error('Register error:', err);
		if (err.status) throw err;
		throw error(500, API_MESSAGES.ERRORS.REGISTRATION_FAILED);
	}
}
