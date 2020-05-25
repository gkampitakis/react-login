import { FastifyInstance } from 'fastify';
import Controller from './controller';

export function registerTwitterAuth(path: string) {
	return (server: FastifyInstance): void => {
		server.get(`${path}/callback`, (req, res) => Controller.callback(req, res));
		server.get(`${path}/request-token`, (req, res) => Controller.requestToken(req, res));
	};
}
