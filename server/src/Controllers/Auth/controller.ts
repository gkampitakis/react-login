import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { decrypt } from '../../Utils/cookie/cookie';

class Controller {
	public logout(req: FastifyRequest, res: FastifyReply<ServerResponse>): void {
		res.clearCookie('rc_login');
		res.status(200).send({
			status: 200,
			message: 'Logged out'
		});
	}

	public login(req: FastifyRequest, res: FastifyReply<ServerResponse>): void {}
}

export default new Controller();
