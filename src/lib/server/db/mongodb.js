import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let client;
let clientPromise;

client = new MongoClient(MONGODB_URI);
clientPromise = client.connect();

export default clientPromise;
