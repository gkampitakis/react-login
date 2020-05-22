import fastify, { FastifyInstance } from 'fastify';
import fastify_cookies from 'fastify-cookie';
import cors from 'fastify-cors';
import registerRoutes from './routes';
import configuration from '../configuration';

class Server {
	private server: FastifyInstance;

	constructor() {
		this.server = fastify();
		this.setup();
	}

	private setup(): void {
		this.server.register(cors, { origin: '*' });
		this.server.register(fastify_cookies, {
			secret: configuration.secret
		});
		registerRoutes(this.server);
	}

	public start(port: number) {
		return this.server.listen(port, '0.0.0.0');
	}
}

export default new Server();
