import { FastifyInstance } from 'fastify';
import Routes from './Controllers';

export default (server: FastifyInstance): void => {
	for (const [, register] of Object.entries(Routes)) {
		register(server);
	}
};
