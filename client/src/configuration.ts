export default {
	api: process.env.REACT_APP_SERVER_URL,
	gh: {
		client_id: process.env.REACT_APP_GH_CLIENT_ID,
		url: function () {
			return `https://github.com/login/oauth/authorize?client_id=${this.client_id}&scope=user:read,user:email`;
		}
	},
	google: {
		client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
		scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(
			' '
		),
		url: (params: string) => `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
		callback: 'http://localhost/api/auth/google/callback'
	},
	twitter: {
		url: 'http://localhost/api/auth/twitter/request-token'
	},
	fb: {
		client_id: process.env.REACT_APP_FB_CLIENT_ID,
		url: (params: string) => `https://www.facebook.com/v4.0/dialog/oauth?${params}`,
		callback: 'http://localhost/api/auth/fb/callback',
		scope: ['email'].join(',')
	}
};
