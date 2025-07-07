export const API_MESSAGES = {
	ERRORS: {
		AUTH_REQUIRED: 'Authentication required',
		INVALID_TOKEN: 'Invalid token',
		INVALID_CREDENTIALS: 'Invalid email or password',
		USER_EXISTS: 'User already exists',
		USER_NOT_FOUND: 'User not found',
		ITEM_NOT_FOUND: 'Item not found',
		INVALID_ITEM_ID: 'Invalid item ID',
		UNAUTHORIZED: 'You can only modify your own items',
		VALIDATION_FAILED: 'Validation failed',
		DATABASE_ERROR: 'Database operation failed',
		LOGIN_FAILED: 'Login failed',
		REGISTRATION_FAILED: 'Registration failed',
		CREATE_ITEM_FAILED: 'Failed to create item',
		UPDATE_ITEM_FAILED: 'Failed to update item',
		DELETE_ITEM_FAILED: 'Failed to delete item',
		TOGGLE_LIKE_FAILED: 'Failed to toggle like',
		LOAD_ITEMS_FAILED: 'Failed to load items'
	},
	SUCCESS: {
		LOGIN_SUCCESS: 'Login successful',
		REGISTRATION_SUCCESS: 'Registration successful',
		LOGOUT_SUCCESS: 'Logout successful',
		ITEM_CREATED: 'Item created successfully',
		ITEM_UPDATED: 'Item updated successfully',
		ITEM_DELETED: 'Item deleted successfully',
		LIKE_TOGGLED: 'Like status updated'
	}
};
