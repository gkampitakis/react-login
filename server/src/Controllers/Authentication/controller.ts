import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';

class Controller {
	public helloWorld(req: FastifyRequest, res: FastifyReply<ServerResponse>): void {
		res.status(200).send('Hello World');
	}

	public Test(req: FastifyRequest, res: FastifyReply<ServerResponse>): void {
		res.status(200).send('Test');
	}
}

export default new Controller();
