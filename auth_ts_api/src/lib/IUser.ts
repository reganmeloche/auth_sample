import { Prom } from '../common/CustomTypes';
import { User } from '../entity/User';
import UserCreate from '../lib/models/UserCreate';
import BaseResult from '../lib/models/BaseResult';

export default interface IUser {
    create(model: UserCreate): Prom<BaseResult>;
    update(model: User): Prom<void>;
    getById(id: string): Prom<User>;
    getByEmail(id: string): Prom<User>;
    getAll(): Prom<User[]>;
    delete(id: string): Prom<void>;
}