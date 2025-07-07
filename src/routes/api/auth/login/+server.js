import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { json, error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { createSuccessResponse } from '$lib/utils/apiResponse.js';
import { API_MESSAGES } from '$lib/constants/api.js';
import { DATABASE, getDB, JWT_CONFIG } from '$lib/server/config.js';

export async function POST({ request, cookies }) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			throw error(400, API_MESSAGES.ERRORS.INVALID_CREDENTIALS);
		}

		const db = await getDB();

		const user = await db.collection(DATABASE.COLLECTIONS.USERS).findOne({ email });
		if (!user) {
			throw error(400, API_MESSAGES.ERRORS.INVALID_CREDENTIALS);
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			throw error(400, API_MESSAGES.ERRORS.INVALID_CREDENTIALS);
		}

		const likes = await db
			.collection(DATABASE.COLLECTIONS.LIKES)
			.find({ userId: user._id })
			.toArray();

		const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
			expiresIn: JWT_CONFIG.EXPIRES_IN
		});

		cookies.set(JWT_CONFIG.COOKIE_NAME, token, {
			...JWT_CONFIG.COOKIE_OPTIONS
		});

		return json(
			createSuccessResponse(
				{
					user: {
						_id: user._id.toString(),
						email: user.email,
						name: user.name,
						createdAt: user.createdAt
					},
					likes: likes.map((like) => like.itemId.toString())
				},
				API_MESSAGES.SUCCESS.LOGIN_SUCCESS
			)
		);
	} catch (err) {
		console.error('Login error:', err);
		if (err.status) throw err;
		throw error(500, API_MESSAGES.ERRORS.LOGIN_FAILED);
	}
}
