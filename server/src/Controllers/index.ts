import { registerGithubAuth } from './GithubAuth';
import { registerTwitterAuth } from './TwitterAuth';
import { registerAuthentication } from './Auth';
import { registerFacebookAuth } from './FacebookAuth';

export default {
	registerAuthentication: registerAuthentication('/auth'),
	registerFacebookAuth: registerFacebookAuth('/auth/fb'),
	registerTwitterAuth: registerTwitterAuth('/auth/twitter'),
	registerGithubAuth: registerGithubAuth('/auth/gh')
};
