import { FastifyInstance } from 'fastify';
import Controller from './controller';

export function registerAuthentication(path: string) {
	return (server: FastifyInstance): void => {};
}
