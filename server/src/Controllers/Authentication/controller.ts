import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { cookieOptions, decrypt } from '../../Utils/cookie';

class Controller {
	public helloWorld(req: FastifyRequest, res: FastifyReply<ServerResponse>): void {
		res.status(200).send(decrypt(req.cookies['auth']));
	}

	public Test(req: FastifyRequest, res: FastifyReply<ServerResponse>): void {
		res.setCookie('auth', '123456', cookieOptions(false));

		res.status(200).send('Test');
	}
}

export default new Controller();
