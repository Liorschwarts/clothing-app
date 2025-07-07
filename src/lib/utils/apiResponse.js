export const createSuccessResponse = (data = null, message = '') => {
	return {
		success: true,
		data,
		message
	};
};
