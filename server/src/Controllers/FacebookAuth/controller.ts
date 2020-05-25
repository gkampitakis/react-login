import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { Authentication } from '../../Components/Authentication';
import { User } from '../../Utils/cookie/interfaces';
import axios from 'axios';
import configuration from '../../../configuration';

class Controller extends Authentication {
	public async callback(req: FastifyRequest, res: FastifyReply<ServerResponse>): Promise<void> {
		const { code } = req.query;

		try {
			const token = await this.getToken(code);

			const data = await this.getUserData(token);

			console.log(this.userDTO(data));
		} catch (error) {
			console.error(error);
		} finally {
			res.redirect('/');
		}
	}

	protected userDTO(data: any): User {
		return {
			email: data.email,
			username: data.last_name + '_' + data.first_name,
			avatar: data.picture.data.url
		};
	}

	protected getToken(code: string): Promise<string> {
		const { client_id, client_secret, token_url, redirect_uri } = configuration.fb;

		return axios({
			method: 'GET',
			url: token_url,
			params: {
				client_id,
				client_secret,
				redirect_uri,
				code
			}
		}).then(({ data }) => data.access_token);
	}

	private getUserData(token: string): Promise<any> {
		const { user_data_url, user_data } = configuration.fb;

		return axios({
			method: 'GET',
			url: user_data_url,
			params: {
				access_token: token,
				fields: user_data.join(',')
			}
		}).then(({ data }) => data);
	}
}

export default new Controller();
