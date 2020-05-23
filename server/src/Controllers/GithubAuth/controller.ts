import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { cookieOptions } from '../../Utils/cookie';
import configuration from '../../../configuration';
import axios from 'axios';

class Controller {
	public async callback(req: FastifyRequest, res: FastifyReply<ServerResponse>): Promise<void> {
		const { clientId, clientSecret } = configuration.gh,
			{ code } = req.query,
			{ data } = await axios({
				method: 'POST',
				url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
				headers: {
					accept: 'application/json'
				}
			});

		res.setCookie('rc_login', data.access_token, cookieOptions(true)); //TODO: this needs handling

		res.redirect('/'); //TODO:this needs handling as well to redirect to home
	}
}

export default new Controller();
