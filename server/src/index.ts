import fastify, { FastifyInstance } from 'fastify';
import cors from 'fastify-cors';

class Server {

    private server: FastifyInstance;

    constructor() {
        this.server = fastify();
        this.setup();
    }

    private setup(): void {

        this.server.register(cors, { origin: '*' });

    }

    public start(port: number) {
        return this.server.listen(port, '0.0.0.0');
    }

}

export default new Server();