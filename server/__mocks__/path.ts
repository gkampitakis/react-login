export default {
	resolve(path: string) {
		resolveSpy(path);
		return 'mockFile';
	}
};

export const resolveSpy = jest.fn();
