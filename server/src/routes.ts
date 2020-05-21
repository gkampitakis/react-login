import { FastifyInstance } from 'fastify';
import Routes from './Controllers';

export default (server: FastifyInstance) => {
	for (let [, register] of Object.entries(Routes)) {
		register(server);
	}
};
