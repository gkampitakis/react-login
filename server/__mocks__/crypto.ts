export default {
	publicDecrypt(key: string, buffer: Buffer) {
		publicDecryptSpy(key, buffer);
		return {
			toString(format: string) {
				toStringSpy(format);
				return 'mockEncryption';
			}
		};
	},
	privateEncrypt(key: string, buffer: Buffer) {
		privateEncryptSpy(key, buffer);
		return {
			toString(format: string) {
				toStringSpy(format);
				return 'mockEncryption';
			}
		};
	}
};

export const publicDecryptSpy = jest.fn(),
	privateEncryptSpy = jest.fn(),
	toStringSpy = jest.fn();
