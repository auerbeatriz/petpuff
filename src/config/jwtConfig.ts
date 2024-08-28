import crypto from 'crypto';

const jwtConfig = {
    secret: process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex'), // Gera uma chave de 32 bytes em hexadecimal
    expiresIn: '1h'
};

export default jwtConfig;