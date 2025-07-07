import { JWT_SECRET } from '$env/static/private';
import clientPromise from '$lib/server/db/mongodb.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';
import { JWT_CONFIG, DATABASE, QUERY_OPTIONS, getDB } from '$lib/server/config.js';
import { API_MESSAGES } from '$lib/constants/api.js';

const EMPTY_STATE = { user: null, likes: [] };

function clearAuth(cookies) {
	cookies.delete(JWT_CONFIG.COOKIE_NAME, { path: JWT_CONFIG.COOKIE_OPTIONS.path });
	return EMPTY_STATE;
}

export async function load({ cookies }) {
	const token = cookies.get(JWT_CONFIG.COOKIE_NAME);
	if (!token) return EMPTY_STATE;

	try {
		const { userId } = jwt.verify(token, JWT_SECRET);
		if (!userId) return clearAuth(cookies);

		const db = await getDB();

		const [user, likes] = await Promise.all([
			db
				.collection(DATABASE.COLLECTIONS.USERS)
				.findOne(
					{ _id: new ObjectId(userId) },
					{ projection: QUERY_OPTIONS.ITEMS.PROJECTION.USER_SAFE }
				),
			db
				.collection(DATABASE.COLLECTIONS.LIKES)
				.find({ userId: new ObjectId(userId) })
				.toArray()
		]);

		if (!user) return clearAuth(cookies);

		return {
			user: {
				_id: user._id.toString(),
				email: user.email,
				name: user.name,
				createdAt: user.createdAt
			},
			likes: likes.map((like) => like.itemId.toString())
		};
	} catch (err) {
		if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
			return clearAuth(cookies);
		}
		console.error('Layout load error:', err);
		throw error(500, API_MESSAGES.ERRORS.DATABASE_ERROR);
	}
}
