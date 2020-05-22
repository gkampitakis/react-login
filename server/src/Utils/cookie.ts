import configuration from '../../configuration';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const { prod, maxAge } = configuration,
	key = fs.readFileSync(path.resolve('./privkey.pem'), 'utf8');

export const decrypt = (value: string) => {
	const buffer = Buffer.from(value, 'base64');
	const decrypted = crypto.publicDecrypt(key, buffer);
	return decrypted.toString('utf8');
};

const encrypt = (value: string) => {
	const buffer = Buffer.from(value);
	const encrypted = crypto.privateEncrypt(key, buffer);
	return encrypted.toString('base64');
};

export const cookieOptions = (session: boolean) => ({
	sameSite: true,
	httpOnly: true,
	secure: prod,
	signed: prod,
	...(session && { maxAge }),
	encode: encrypt
});
