import { FastifyInstance } from 'fastify';
import Controller from './controller';

export function registerGoogleAuth(path: string) {
	return (server: FastifyInstance): void => {
		server.get(`${path}/callback`, (req, res) => Controller.callback(req, res));
	};
}
