import { FastifyInstance } from 'fastify';
import Controller from './controller';

export function registerAuthentications(path: string) {
	return (server: FastifyInstance) => {
		server.get(`${path}/hello`, (req, res) => Controller.helloWorld(req, res));

		server.get(`${path}/test`, (req, res) => Controller.Test(req, res));
	};
}
