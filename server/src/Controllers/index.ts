import { registerGithubAuth } from './GithubAuth';
import { registerAuthentication } from './Auth';

export default {
	registerAuthentication: registerAuthentication('/auth'),
	registerGithubAuth: registerGithubAuth('/auth/gh')
};
