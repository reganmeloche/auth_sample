import { v4 as uuidv4 } from 'uuid';

import { NotFound } from '../common/Errors';
import IUser from './IUser';
import IUserDal from '../storage/IUserDal';
import { User } from '../entity/User';
import UserCreate from '../lib/models/UserCreate';
import BaseResult from '../lib/models/BaseResult';

export default class UserLib implements IUser {
    private readonly _userDal: IUserDal;

    public constructor(userDal: IUserDal) {
        this._userDal = userDal;
    }

    public async create(model: UserCreate): Promise<BaseResult> {
        const userId = uuidv4();
        const newUser = new User();
        newUser.id = userId;
        newUser.email = model.email;
        newUser.claims = model.claims;
        newUser.createDate = new Date(),
        newUser.hashedPassword = model.hashedPassword;
        await this._userDal.insert(newUser);
        return new BaseResult(userId);
    }

    public async update(model: User): Promise<void> {
        await this._userDal.update(model);
    }

    public async getById(userId: string): Promise<User> {
        const result = await this._userDal.getById(userId);
        if (result) {
            return result;
        }
        throw new NotFound('User not found');
    }

    public async getByEmail(email: string): Promise<User> {
        const result = await this._userDal.getUserByEmail(email);
        if (result) {
            return result;
        }
        throw new NotFound('User not found');
    }

    public async getAll(): Promise<User[]> {
        return await this._userDal.getAll();
    }

    public async delete(userId: string): Promise<void> {
        return this._userDal.delete(userId);
    }
}
