import { json } from '@sveltejs/kit';
import { createSuccessResponse } from '$lib/utils/apiResponse.js';
import { API_MESSAGES } from '$lib/constants/api.js';
import { JWT_CONFIG } from '$lib/server/config.js';

export const POST = async ({ cookies }) => {
	try {
		cookies.delete(JWT_CONFIG.COOKIE_NAME, { path: JWT_CONFIG.COOKIE_OPTIONS.path });

		return json(createSuccessResponse(null, API_MESSAGES.SUCCESS.LOGOUT_SUCCESS));
	} catch (err) {
		console.error('Logout error:', err);
		return json(createSuccessResponse(null, API_MESSAGES.SUCCESS.LOGOUT_SUCCESS));
	}
};
