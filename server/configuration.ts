import dotenv from 'dotenv';
import Path from 'path';

const path = Path.join(process.cwd(), `./.env.${process.env.NODE_ENV}`);
dotenv.config({ path });

export default {
	prod: process.env.NODE_ENV === 'prod',
	port: parseInt(process.env.PORT),
	secret: process.env.SECRET || 'default secret',
	maxAge: parseInt(process.env.COOKIE_AGE) || 2592000
};
