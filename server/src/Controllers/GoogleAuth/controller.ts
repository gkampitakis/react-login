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
			console.log(error);
		} finally {
			res.redirect('/');
		}
	}

	protected getToken(code: string): Promise<any> {
		const { client_id, client_secret, token_url, redirect_uri } = configuration.google;

		return axios({
			method: 'POST',
			url: token_url,
			data: {
				client_id,
				client_secret,
				redirect_uri,
				grant_type: 'authorization_code',
				code
			}
		}).then(({ data }) => data.access_token);
	}

	protected userDTO(data: any): User {
		return {
			email: data.email,
			username: data.name.replace(' ', '_'),
			avatar: data.picture
		};
	}

	private getUserData(token: string): Promise<any> {
		const { user_data_url } = configuration.google;

		return axios({
			method: 'GET',
			url: user_data_url,
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then(({ data }) => data);
	}
}

export default new Controller();
