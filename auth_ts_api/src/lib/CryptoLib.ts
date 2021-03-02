import bcrypt from 'bcrypt';
import ICrypto from './iCrypto';

export default class Crypto implements ICrypto {
    public async compare(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    public async hash(password: string, salt: number) {
        return await bcrypt.hash(password, salt);
    }
}