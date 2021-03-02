import UserLite from './models/UserLite';
import Signup from './models/Signup';
import BaseResult from './models/BaseResult';
import { Prom } from '../common/CustomTypes';

export default interface IAuth {
    tryLogin(email: string, password: string): Prom<UserLite>;
    createUser(user: Signup, claims: string[]): Prom<BaseResult>;
    getUserById(userId: string): Prom<UserLite>;
    getUserByEmail(email: string): Prom<UserLite>;
    changePassword(email: string, password: string, newPassword: string): Prom<void>;
}
