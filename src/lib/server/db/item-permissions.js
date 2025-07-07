import clientPromise from '$lib/server/db/mongodb.js';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';
import { DATABASE, getDB } from '../config.js';
import { API_MESSAGES } from '$lib/constants/api.js';

export async function requireItemOwnership(itemId, userId) {
	if (!ObjectId.isValid(itemId)) {
		throw error(400, API_MESSAGES.ERRORS.INVALID_ITEM_ID);
	}

	const db = await getDB();
	const item = await db.collection(DATABASE.COLLECTIONS.ITEMS).findOne({
		_id: new ObjectId(itemId)
	});

	if (!item) {
		throw error(404, API_MESSAGES.ERRORS.ITEM_NOT_FOUND);
	}

	if (item.createdBy.toString() !== userId) {
		throw error(403, API_MESSAGES.ERRORS.UNAUTHORIZED);
	}

	return item;
}

export async function getItemById(itemId) {
	if (!ObjectId.isValid(itemId)) {
		throw error(400, API_MESSAGES.ERRORS.INVALID_ITEM_ID);
	}

	const db = await getDB();
	const item = await db.collection(DATABASE.COLLECTIONS.ITEMS).findOne({
		_id: new ObjectId(itemId)
	});

	if (!item) {
		throw error(404, API_MESSAGES.ERRORS.ITEM_NOT_FOUND);
	}

	return item;
}
