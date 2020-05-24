import { FastifyInstance } from 'fastify';
import Controller from './controller';

export function registerFacebookAuth(path: string) {
	return (server: FastifyInstance): void => {
		server.get(`${path}/callback`, (req, res) => Controller.callback(req, res));
	};
}
