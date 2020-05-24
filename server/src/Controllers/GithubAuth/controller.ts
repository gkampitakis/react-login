import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { cookieOptions } from '../../Utils/cookie/cookie';
import configuration from '../../../configuration';
import axios from 'axios';
import { User } from '../../Utils/cookie/interfaces';
import { Authentication } from '../../Components/Authentication';

class Controller extends Authentication {
	public async callback(req: FastifyRequest, res: FastifyReply<ServerResponse>): Promise<void> {
		const { clientId, clientSecret } = configuration.gh,
			{ code } = req.query;

		try {
			const token = await this.getToken(code, clientId, clientSecret);

			const data = await this.getUserData(token);

			console.log(this.userDTO(data));

			res.setCookie('rc_login', token, cookieOptions(true)); //TODO: this needs handling, and we need to create a token containing more data

			res.redirect('/'); //TODO:this needs handling as well to redirect to home
		} catch (error) {
			res.redirect('/'); //TODO: this will redirect to login again
		}
	}

	protected userDTO(data): User {
		return {
			email: data.emails.filter((email) => email.primary)[0].email,
			username: data.login,
			avatar: data.avatar_url
		};
	}

	protected getToken(code: string, clientId: string, clientSecret: string): Promise<string> {
		return axios({
			method: 'GET',
			url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
			headers: {
				accept: 'application/json'
			}
		}).then(({ data }) => data.access_token);
	}

	private getUserData(token: string): Promise<any> {
		const userInfo = axios({
			method: 'GET',
			url: `https://api.github.com/user`,
			headers: {
				Authorization: `token ${token}`
			}
		}).then(({ data }) => data);

		const emails = axios({
			method: 'GET',
			url: `https://api.github.com/user/emails`,
			headers: {
				Authorization: `token ${token}`
			}
		}).then(({ data }) => data);

		return Promise.all([userInfo, emails]).then((data) => ({
			...data[0],
			emails: data[1]
		}));
	}
}

export default new Controller();
