import clientPromise from '$lib/server/db/mongodb.js';
import { ObjectId } from 'mongodb';
import { json, error } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';
import { createSuccessResponse } from '$lib/utils/apiResponse.js';
import { API_MESSAGES } from '$lib/constants/api.js';
import { DATABASE, getDB } from '$lib/server/config.js';

export async function POST({ params, cookies }) {
	try {
		const userId = await requireAuth(cookies);
		const { itemId } = params;

		if (!ObjectId.isValid(itemId)) {
			throw error(400, API_MESSAGES.ERRORS.INVALID_ITEM_ID);
		}

		const db = await getDB();

		const existingLike = await db.collection(DATABASE.COLLECTIONS.LIKES).findOne({
			userId: new ObjectId(userId),
			itemId: new ObjectId(itemId)
		});

		if (existingLike) {
			await db.collection(DATABASE.COLLECTIONS.LIKES).deleteOne({
				userId: new ObjectId(userId),
				itemId: new ObjectId(itemId)
			});
			return json(
				createSuccessResponse(
					{
						isLiked: false
					},
					API_MESSAGES.SUCCESS.LIKE_TOGGLED
				)
			);
		} else {
			await db.collection(DATABASE.COLLECTIONS.LIKES).insertOne({
				userId: new ObjectId(userId),
				itemId: new ObjectId(itemId),
				createdAt: new Date()
			});
			return json(
				createSuccessResponse(
					{
						isLiked: true
					},
					API_MESSAGES.SUCCESS.LIKE_TOGGLED
				)
			);
		}
	} catch (err) {
		console.error('Failed to toggle like:', err);
		if (err.status) throw err;
		throw error(500, API_MESSAGES.ERRORS.TOGGLE_LIKE_FAILED);
	}
}
