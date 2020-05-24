import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import axios from 'axios';
import { Authentication } from '../../Components/Authentication';
import { User } from '../../Utils/cookie/interfaces';
import configuration from '../../../configuration';

class Controller extends Authentication {
	public async callback(req: FastifyRequest, res: FastifyReply<ServerResponse>): Promise<void> {
		const { clientId, clientSecret } = configuration.fb,
			{ code } = req.query;

		try {
			const token = await this.getToken(code, clientId, clientSecret);

			const data = await this.getUserData(token);

			console.log(this.userDTO(data));

			res.redirect('/'); //FIXME:
			//FIXME: the setcookie as well
		} catch (error) {
			console.error(error);

			res.redirect('/'); //FIXME:
		}
	}

	protected userDTO(data: any): User {
		return {
			email: data.email,
			username: data.last_name + '_' + data.first_name,
			avatar: data.picture.data.url
		};
	}

	protected getToken(code: string, clientId: string, clientSecret: string): Promise<string> {
		return axios({
			method: 'GET',
			url: `https://graph.facebook.com/v4.0/oauth/access_token`,
			params: {
				client_id: clientId,
				client_secret: clientSecret,
				redirect_uri: 'http://localhost/api/auth/fb/callback',
				code
			}
		}).then(({ data }) => data.access_token);
	}

	private getUserData(token: string): Promise<any> {
		return axios({
			method: 'GET',
			url: 'https://graph.facebook.com/me',
			params: {
				access_token: token,
				fields: ['email', 'first_name', 'last_name', 'picture.type(large)'].join(',')
			}
		}).then(({ data }) => data);
	}
}

export default new Controller();

//TODO: move all urls to configuration
