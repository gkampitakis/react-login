import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { cookieOptions } from '../../Utils/cookie/cookie';
import { User } from '../../Utils/cookie/interfaces';
import { Authentication } from '../../Components/Authentication';
import configuration from '../../../configuration';
import axios from 'axios';

class Controller extends Authentication {
	public async callback(req: FastifyRequest, res: FastifyReply<ServerResponse>): Promise<void> {
		const { code } = req.query;

		try {
			const token = await this.getToken(code);

			const data = await this.getUserData(token);

			console.log(this.userDTO(data));

			// res.setCookie('rc_login', token, cookieOptions(true)); //TODO: this needs handling, and we need to create a token containing more data
		} catch (error) {
			console.log(error);
		} finally {
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

	protected getToken(code: string): Promise<string> {
		const { token_url } = configuration.gh;

		return axios({
			method: 'GET',
			url: token_url(code),
			headers: {
				accept: 'application/json'
			}
		}).then(({ data }) => data.access_token);
	}

	private getUserData(token: string): Promise<any> {
		const { user_url, user_email_url } = configuration.gh;

		const userInfo = axios({
			method: 'GET',
			url: user_url,
			headers: {
				Authorization: `token ${token}`
			}
		}).then(({ data }) => data);

		const emails = axios({
			method: 'GET',
			url: user_email_url,
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
