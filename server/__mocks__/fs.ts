export default {
	readFileSync(file: any, encoding: string) {
		readFileSyncSpy(file, encoding);
		return 'mockKey';
	}
};

export const readFileSyncSpy = jest.fn();
