import { JwtPayload } from 'jsonwebtoken';

export interface IRefreshTokenPayload extends JwtPayload {
    code: string;
}
