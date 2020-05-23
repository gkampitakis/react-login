import Controller from './controller';

describe('Auth', () => {
	let mockRequest: any, mockResponse: any;

	const clearCookieSpy = jest.fn(),
		statusSpy = jest.fn(),
		sendSpy = jest.fn();

	beforeEach(() => {
		mockRequest = {};
		mockResponse = {
			clearCookie(param: string) {
				clearCookieSpy(param);
				return;
			},
			status(code: number) {
				statusSpy(code);
				return {
					send(response: any) {
						sendSpy(response);
						return;
					}
				};
			}
		};
	});

	describe('logout', () => {
		it('Should clear cookie and respond with 200', () => {
			Controller.logout(mockRequest, mockResponse);

			expect(clearCookieSpy).toHaveBeenNthCalledWith(1, 'rc_login');
			expect(statusSpy).toHaveBeenNthCalledWith(1, 200);
			expect(sendSpy).toHaveBeenNthCalledWith(1, {
				status: 200,
				message: 'Logged out'
			});
		});
	});
});
