import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { cookieOptions, decrypt } from '../../Utils/cookie/cookie';

class Controller {
	public callback(req: FastifyRequest, res: FastifyReply<ServerResponse>): void {}
}

export default new Controller();
