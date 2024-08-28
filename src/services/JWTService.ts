import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';

export class JWTService {
    private static readonly secret: string = jwtConfig.secret; 
    private static readonly options: SignOptions = { expiresIn: jwtConfig.expiresIn };

    static generateToken(payload: JwtPayload): string {
        return jwt.sign(payload, JWTService.secret, JWTService.options);
    }

    static verifyToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, JWTService.secret) as JwtPayload;
        } catch (err) {
            return null;
        }
    }
}

export default JWTService;