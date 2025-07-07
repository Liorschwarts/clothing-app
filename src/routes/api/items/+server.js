import clientPromise from '$lib/server/db/mongodb.js';
import { ObjectId } from 'mongodb';
import { json, error } from '@sveltejs/kit';
import { validateItemData } from '$lib/utils/validation.js';
import { requireAuth } from '$lib/server/auth';
import { createSuccessResponse } from '$lib/utils/apiResponse.js';
import { API_MESSAGES } from '$lib/constants/api.js';
import { CATEGORY_TYPES } from '$lib/constants/categories.js';
import { DATABASE, getDB } from '$lib/server/config.js';

export async function GET() {
	try {
		const db = await getDB();

		const items = await db
			.collection(DATABASE.COLLECTIONS.ITEMS)
			.find({})
			.sort({ createdAt: -1 })
			.toArray();

		const serializedItems = items.map((item) => ({
			_id: item._id.toString(),
			name: item.name || '',
			description: item.description || '',
			price: item.price || 0,
			image: item.image || '',
			category: item.category || CATEGORY_TYPES.GENERAL,
			createdBy: item.createdBy?.toString() || '',
			createdAt: item.createdAt || null
		}));

		return json(createSuccessResponse({ items: serializedItems }));
	} catch (err) {
		console.error('Failed to get items:', err);
		throw error(500, API_MESSAGES.ERRORS.LOAD_ITEMS_FAILED);
	}
}

export async function POST({ request, cookies }) {
	try {
		const userId = await requireAuth(cookies);
		const itemData = await request.json();

		const validation = validateItemData(itemData);
		if (!validation.isValid) {
			throw error(400, validation.errors.join(', '));
		}

		const { name, description, price, image, category } = itemData;

		const db = await getDB();

		const result = await db.collection(DATABASE.COLLECTIONS.ITEMS).insertOne({
			name: name.trim(),
			description: description.trim(),
			price: Number(price),
			image: image?.trim() || '',
			category: category || CATEGORY_TYPES.GENERAL,
			createdBy: new ObjectId(userId),
			createdAt: new Date()
		});

		return json(
			createSuccessResponse(
				{
					item: {
						_id: result.insertedId.toString(),
						name: name.trim(),
						description: description.trim(),
						price: Number(price),
						image: image?.trim() || '',
						category: category || CATEGORY_TYPES.GENERAL,
						createdBy: userId,
						createdAt: new Date()
					}
				},
				API_MESSAGES.SUCCESS.ITEM_CREATED
			)
		);
	} catch (err) {
		console.error('Failed to create item:', err);
		if (err.status) throw err;
		throw error(500, API_MESSAGES.ERRORS.CREATE_ITEM_FAILED);
	}
}
