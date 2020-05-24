import { User } from '../Utils/cookie/interfaces';

export abstract class Authentication {
	public constructor() {
		console.log('Authentication Abstract Class');
	}

	protected abstract userDTO(...params: any): User;
}
