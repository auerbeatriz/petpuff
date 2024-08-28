import { Request, Response, NextFunction } from 'express';
import { JWTService }from './JWTService';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const decoded = JWTService.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }

    next();
};
