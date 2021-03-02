import { v4 as uuidv4 } from 'uuid';

import IAuth from './IAuth';
import IUser from './IUser';
import ICrypto from './ICrypto';
import { NotFound, ValidationError } from '../common/Errors';
import UserLite from './models/UserLite';
import Signup from './models/Signup';
import UserCreate from './models/UserCreate';
import BaseResult from './models/BaseResult';

export default class AuthLib implements IAuth {
    private readonly _userLib: IUser;
    private readonly _cryptoLib: ICrypto;

    public constructor(
        user: IUser,
        crypto: ICrypto
    ) {
        this._userLib = user;
        this._cryptoLib = crypto;
    }

    public async tryLogin(email: string, password: string): Promise<UserLite> {
        const user = await this._userLib.getByEmail(email); // If it throws NotFound, then fine
        const test = await this._cryptoLib.compare(password, user.hashedPassword);
        if (test) {
            return new UserLite(user.id, email, user.claims);
        }
        throw new ValidationError('Incorrect password');
    }

    public async getUserById(userId: string): Promise<UserLite> {
        const user = await this._userLib.getById(userId);
        return new UserLite(userId, user.email, user.claims);
    }

    public async getUserByEmail(email: string): Promise<UserLite> {
        const user = await this._userLib.getByEmail(email);
        return new UserLite(user.id, user.email, user.claims);
    }

    public async createUser(model: Signup, claims: string[]): Promise<BaseResult> {
        try {
            await this._userLib.getByEmail(model.email);
            throw new ValidationError('User already exists.');
        }
        catch (err) {
            if (err instanceof NotFound) {
                const hashedPassword = await this._cryptoLib.hash(model.password, 10);
                const createModel = new UserCreate(model.email, hashedPassword, claims);
                return await this._userLib.create(createModel);
            } else {
                throw err;
            }
        }
    }

    public async changePassword(email: string, password: string, newPassword: string): Promise<void> {
        await this.tryLogin(email, password);
        const newHashedPassword = await this._cryptoLib.hash(newPassword, 10);
        const userToChange = await this._userLib.getByEmail(email);
        userToChange.hashedPassword = newHashedPassword;
        await this._userLib.update(userToChange);
    }
}
