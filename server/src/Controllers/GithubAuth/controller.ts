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
			{ code } = req.query,
			{ data } = await axios({
				method: 'GET',
				url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
				headers: {
					accept: 'application/json'
				}
			});

		try {
			const { data: emails } = await axios({
				method: 'GET',
				url: `https://api.github.com/user/emails`,
				headers: {
					Authorization: `token ${data.access_token}`
				}
			});

			const { data: user } = await axios({
				method: 'GET',
				url: `https://api.github.com/user`,
				headers: {
					Authorization: `token ${data.access_token}`
				}
			});

			console.log(this.userDTO(emails, user));

			res.setCookie('rc_login', data.access_token, cookieOptions(true)); //TODO: this needs handling, and we need to create a token containing more data

			res.redirect('/'); //TODO:this needs handling as well to redirect to home
		} catch (error) {
			res.redirect('/'); //TODO: this will redirect to login again
		}
	}

	protected userDTO(emails: any[], userInfo: any): User {
		return {
			email: emails.filter((email) => email.primary)[0].email,
			username: userInfo.login,
			avatar: userInfo.avatar_url
		};
	}
}

export default new Controller();
