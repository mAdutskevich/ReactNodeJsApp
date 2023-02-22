import { IToken } from './IToken';

export type ICreateToken = Pick<IToken, 'code' | 'iss'>;
