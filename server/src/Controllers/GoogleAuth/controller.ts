import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { cookieOptions, decrypt } from '../../Utils/cookie/cookie';
import { Authentication } from '../../Components/Authentication';
import { User } from '../../Utils/cookie/interfaces';
import configuration from '../../../configuration';

class Controller extends Authentication {
	public async callback(req: FastifyRequest, res: FastifyReply<ServerResponse>): Promise<void> {}

	protected getToken(): Promise<any> {
		return Promise.resolve();
	}

	protected userDTO(data: any): User {
		return {
			email: '',
			username: '',
			avatar: ''
		};
	}
}

export default new Controller();
