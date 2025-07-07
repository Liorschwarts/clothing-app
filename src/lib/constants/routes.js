export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	FAVORITES: '/favorites',
	ITEM: '/item',

	API: {
		AUTH: {
			LOGIN: '/api/auth/login',
			REGISTER: '/api/auth/register',
			LOGOUT: '/api/auth/logout'
		},
		ITEMS: '/api/items',
		LIKES: '/api/likes',
		TEST: '/api/test'
	}
};

export const getItemRoute = (itemId) => `${ROUTES.ITEM}/${itemId}`;
export const getLikeRoute = (itemId) => `${ROUTES.API.LIKES}/${itemId}`;
export const getItemApiRoute = (itemId) => `${ROUTES.API.ITEMS}/${itemId}`;
