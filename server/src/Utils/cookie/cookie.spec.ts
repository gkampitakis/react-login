import { cookieOptions, decrypt } from './cookie';

jest.mock('path');
jest.mock('fs');
jest.mock('crypto');
jest.mock('../../../configuration', () => ({
	prod: false,
	maxAge: 10
}));

describe('Cookie', () => {
	const { resolveSpy } = jest.requireMock('path'),
		{ readFileSyncSpy } = jest.requireMock('fs'),
		{ publicDecryptSpy, privateEncryptSpy, toStringSpy } = jest.requireMock('crypto'),
		BufferSpy = jest.spyOn(Buffer, 'from');

	beforeEach(() => {
		resolveSpy.mockClear();
		readFileSyncSpy.mockClear();
		BufferSpy.mockClear();
		toStringSpy.mockClear();
	});

	describe('decrypt', () => {
		it('Should call crypto publicDecrypt', () => {
			const value = decrypt('mockValue');

			expect(BufferSpy).toHaveBeenNthCalledWith(1, 'mockValue', 'base64');
			expect(publicDecryptSpy).toHaveBeenNthCalledWith(1, 'mockKey', expect.any(Buffer));
			expect(toStringSpy).toHaveBeenNthCalledWith(1, 'utf8');
			expect(value).toBe('mockEncryption');
		});
	});

	describe('cookieOptions', () => {
		it('Should return an object with maxAge and encode value', () => {
			const options = cookieOptions(true);

			expect(options).toEqual({
				sameSite: true,
				httpOnly: true,
				secure: false,
				signed: false,
				maxAge: 10,
				encode: expect.any(Function)
			});
		});

		it('Should return an object with no maxAge and encode value', () => {
			const options = cookieOptions(false);

			expect(options).toEqual({
				sameSite: true,
				httpOnly: true,
				secure: false,
				signed: false,
				encode: expect.any(Function)
			});
		});

		it('Should call crypto privateEncrypt', () => {
			const options = cookieOptions(true),
				value = options.encode('mockValue');

			expect(BufferSpy).toHaveBeenNthCalledWith(1, 'mockValue');
			expect(privateEncryptSpy).toHaveBeenNthCalledWith(1, 'mockKey', expect.any(Buffer));
			expect(toStringSpy).toHaveBeenNthCalledWith(1, 'base64');
			expect(value).toBe('mockEncryption');
		});
	});
});
