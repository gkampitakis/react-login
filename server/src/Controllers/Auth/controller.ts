import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { cookieOptions, decrypt } from '../../Utils/cookie';

class Controller {
	public logout(req: FastifyRequest, res: FastifyReply<ServerResponse>): void {}

	public login(req: FastifyRequest, res: FastifyReply<ServerResponse>): void {}
}

export default new Controller();
