export interface ITokenData {
	id: number;
	firstname: string;
	lastname: string;
	login: string;
}

export type IENTITY_TYPES = 'course' | 'lecture' | 'user';

export type IUSER_SCOPES = 'ADMIN' | 'STUDENT';
