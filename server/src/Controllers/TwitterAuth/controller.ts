import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { cookieOptions, decrypt } from '../../Utils/cookie/cookie';
import { Authentication } from '../../Components/Authentication';
import { User } from '../../Utils/cookie/interfaces';
import Twitter from 'node-twitter-api';
import configuration from '../../../configuration';

class Controller extends Authentication {
	private twitter_connector;
	private request_secret: string;

	public constructor() {
		super();
		const { client_id, client_secret, callback } = configuration.twitter;

		this.twitter_connector = new Twitter({
			consumerKey: client_id,
			consumerSecret: client_secret,
			callback
		});
	}

	public async requestToken(req: FastifyRequest, res: FastifyReply<ServerResponse>): Promise<void> {
		const { token_request_url } = configuration.twitter;

		try {
			const { token, secret } = await this.getRequestToken();
			this.request_secret = secret;

			res.redirect(token_request_url(token));
		} catch (error) {
			console.log(error);
		}
	}

	public async callback(req: FastifyRequest, res: FastifyReply<ServerResponse>): Promise<void> {
		const { oauth_token, oauth_verifier } = req.query;

		try {
			const { token, secret } = await this.getToken(oauth_token, oauth_verifier, this.request_secret);

			const data = await this.getUserData(token, secret);

			console.log(this.userDTO(data));

			res.redirect('/');
		} catch (error) {
			console.log(error);
		}
	}

	private getRequestToken(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.twitter_connector.getRequestToken((err, token, secret) => {
				if (err) return reject(err);

				resolve({ token, secret });
			});
		});
	}

	protected getToken(
		oauth_token: string,
		oauth_verifier: string,
		request_secret: string
	): Promise<{
		token: string;
		secret: string;
	}> {
		return new Promise((resolve, reject) => {
			this.twitter_connector.getAccessToken(oauth_token, request_secret, oauth_verifier, (err, token, secret) => {
				if (err) return reject(err);
				resolve({
					token,
					secret
				});
			});
		});
	}

	private getUserData(token: string, secret: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.twitter_connector.verifyCredentials(token, secret, { include_email: true }, (err, user) => {
				if (err) return reject(err);
				resolve(user);
			});
		});
	}

	protected userDTO(data: any): User {
		return {
			email: data.email,
			username: data.screen_name,
			avatar: data.profile_image_url_https
		};
	}
}

export default new Controller();
