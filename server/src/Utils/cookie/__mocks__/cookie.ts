export function cookieOptions(session: boolean): any {
	cookieOptionsSpy(session);
	return {};
}

export const cookieOptionsSpy = jest.fn();
