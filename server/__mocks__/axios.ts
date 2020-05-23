/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export default function Axios(params: any): Promise<{ data }> {
	axiosSpy(params);

	return Promise.resolve({
		data: {
			access_token: 'mockToken'
		}
	});
}

export const axiosSpy = jest.fn();
