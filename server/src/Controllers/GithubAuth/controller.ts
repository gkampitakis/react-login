import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { cookieOptions } from '../../Utils/cookie';

class Controller {
	public callback(req: FastifyRequest, res: FastifyReply<ServerResponse>): void {}
}

export default new Controller();
