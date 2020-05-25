export default {
  api: process.env.REACT_APP_SERVER_URL,
  gh: {
    clientId: process.env.REACT_APP_GH_CLIENT_ID,
    url: function () {
      return `https://github.com/login/oauth/authorize?client_id=${this.clientId}&scope=user:read,user:email`;
    },
  },
  twitter: {
    url: "http://localhost/api/auth/twitter/request-token",
  },
  fb: {
    clientId: process.env.REACT_APP_FB_CLIENT_ID,
    url: (params: string) =>
      `https://www.facebook.com/v4.0/dialog/oauth?${params}`,
    callback: "http://localhost/api/auth/fb/callback",
    scope: ["email"].join(","),
  },
};
