import dotenv from 'dotenv';
import Path from 'path';

const path = Path.join(process.cwd(), `./.env.${process.env.NODE_ENV}`);
dotenv.config({ path });

export default {
	prod: process.env.NODE_ENV === 'prod',
	port: parseInt(process.env.PORT),
	secret: process.env.SECRET || 'default secret',
	maxAge: parseInt(process.env.COOKIE_AGE) || 2592000,
	gh: {
		client_id: process.env.GH_CLIENT_ID,
		client_secret: process.env.GH_CLIENT_SECRET,
		token_url: function (code: string) {
			return `https://github.com/login/oauth/access_token?client_id=${this.client_id}&client_secret=${this.client_secret}&code=${code}`;
		},
		user_url: 'https://api.github.com/user',
		user_email_url: 'https://api.github.com/user/emails'
	},
	twitter: {
		client_id: process.env.TWITTER_KEY,
		client_secret: process.env.TWITTER_SECRET_KEY
	},
	fb: {
		client_id: process.env.FB_APP_ID,
		client_secret: process.env.FB_APP_SECRET,
		token_url: 'https://graph.facebook.com/v4.0/oauth/access_token',
		redirect_uri: 'http://localhost/api/auth/fb/callback',
		user_data_url: 'https://graph.facebook.com/me',
		user_data: ['email', 'first_name', 'last_name', 'picture.type(large)']
	}
};
