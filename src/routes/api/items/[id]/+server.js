import { ObjectId } from 'mongodb';
import { json, error } from '@sveltejs/kit';
import { validateItemData } from '$lib/utils/validation.js';
import { requireAuth } from '$lib/server/auth.js';
import clientPromise from '$lib/server/db/mongodb.js';
import { getItemById, requireItemOwnership } from '$lib/server/db/item-permissions';
import { createSuccessResponse } from '$lib/utils/apiResponse.js';
import { API_MESSAGES } from '$lib/constants/api.js';
import { CATEGORY_TYPES } from '$lib/constants/categories.js';
import { DATABASE, getDB } from '$lib/server/config.js';

export async function GET({ params }) {
	try {
		const item = await getItemById(params.id);

		return json(
			createSuccessResponse({
				item: {
					_id: item._id.toString(),
					name: item.name || '',
					description: item.description || '',
					price: item.price || 0,
					image: item.image || '',
					category: item.category || CATEGORY_TYPES.GENERAL,
					createdBy: item.createdBy?.toString() || '',
					createdAt: item.createdAt || null
				}
			})
		);
	} catch (err) {
		console.error('Failed to get item:', err);
		if (err.status) throw err;
		throw error(500, API_MESSAGES.ERRORS.ITEM_NOT_FOUND);
	}
}

export async function PUT({ params, request, cookies }) {
	try {
		const userId = await requireAuth(cookies);
		const item = await requireItemOwnership(params.id, userId);

		const updateData = await request.json();

		const fullItemData = { ...item, ...updateData };
		const validation = validateItemData(fullItemData);
		if (!validation.isValid) {
			throw error(400, validation.errors.join(', '));
		}

		const db = await getDB();

		await db.collection(DATABASE.COLLECTIONS.ITEMS).updateOne(
			{ _id: new ObjectId(params.id) },
			{
				$set: {
					description: updateData.description.trim(),
					price: Number(updateData.price),
					updatedAt: new Date()
				}
			}
		);

		return json(createSuccessResponse(null, API_MESSAGES.SUCCESS.ITEM_UPDATED));
	} catch (err) {
		console.error('Failed to update item:', err);
		if (err.status) throw err;
		throw error(500, API_MESSAGES.ERRORS.UPDATE_ITEM_FAILED);
	}
}

export async function DELETE({ params, cookies }) {
	try {
		const userId = await requireAuth(cookies);
		await requireItemOwnership(params.id, userId);

		const db = await getDB();

		await db.collection(DATABASE.COLLECTIONS.ITEMS).deleteOne({
			_id: new ObjectId(params.id)
		});
		await db.collection(DATABASE.COLLECTIONS.LIKES).deleteMany({
			itemId: new ObjectId(params.id)
		});

		return json(createSuccessResponse(null, API_MESSAGES.SUCCESS.ITEM_DELETED));
	} catch (err) {
		console.error('Failed to delete item:', err);
		if (err.status) throw err;
		throw error(500, API_MESSAGES.ERRORS.DELETE_ITEM_FAILED);
	}
}
