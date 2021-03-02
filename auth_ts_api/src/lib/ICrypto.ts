import { Prom } from '../common/CustomTypes';

export default interface ICrypto {
    compare(password: string, hashedPassword: string): Prom<boolean>;
    hash(password: string, salt: number): Prom<string>;
}
