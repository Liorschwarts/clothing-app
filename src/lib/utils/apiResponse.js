export function createSuccessResponse(data = null, message = '') {
	return {
		success: true,
		data,
		message
	};
}
