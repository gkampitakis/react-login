import Controller from './controller';

jest.mock('../../../configuration', () => ({
	gh: {
		clientId: 'mockId',
		clientSecret: 'secret'
	}
}));
jest.mock('axios');
jest.mock('../../Utils/cookie/cookie');

describe('GithubAuth', () => {
	let mockRequest: any, mockResponse: any;

	const { axiosSpy } = jest.requireMock('axios'),
		{ cookieOptionsSpy } = jest.requireMock('../../Utils/cookie/cookie'),
		setCookieSpy = jest.fn(),
		redirectSpy = jest.fn();

	beforeEach(() => {
		mockRequest = {
			query: {
				code: 'mockCode'
			}
		};
		mockResponse = {
			setCookie(name: string, value: string, options: any) {
				setCookieSpy(name, value, options);
				return;
			},
			redirect(dest: string) {
				redirectSpy(dest);
				return;
			}
		};

		axiosSpy.mockClear();
		cookieOptionsSpy.mockClear();
	});

	describe('callback', () => {
		it('Should call github oath', async () => {
			await Controller.callback(mockRequest, mockResponse);

			expect(axiosSpy).toHaveBeenNthCalledWith(1, {
				method: 'POST',
				url: 'https://github.com/login/oauth/access_token?client_id=mockId&client_secret=secret&code=mockCode',
				headers: {
					accept: 'application/json'
				}
			});
			expect(setCookieSpy).toHaveBeenNthCalledWith(1, 'rc_login', 'mockToken', {});
			expect(cookieOptionsSpy).toHaveBeenNthCalledWith(1, true);
			expect(redirectSpy).toHaveBeenNthCalledWith(1, '/');
		});
	});
});
