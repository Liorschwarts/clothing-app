import clientPromise from './db/mongodb';

export const JWT_CONFIG = {
	EXPIRES_IN: '7d',
	COOKIE_NAME: 'auth-token',
	COOKIE_OPTIONS: {
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7,
		path: '/'
	}
};

export const PASSWORD_CONFIG = {
	BCRYPT_ROUNDS: 10
};

export const DATABASE = {
	NAME: 'clothing-app',
	COLLECTIONS: {
		USERS: 'users',
		ITEMS: 'items',
		LIKES: 'likes'
	}
};

export const QUERY_OPTIONS = {
	ITEMS: {
		SORT: { createdAt: -1 },
		PROJECTION: {
			USER_SAFE: { password: 0 }
		}
	}
};

export async function getDB() {
	const client = await clientPromise;
	return client.db(DATABASE.NAME);
}
