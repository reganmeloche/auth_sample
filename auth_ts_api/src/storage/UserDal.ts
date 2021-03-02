import { Repository } from 'typeorm';
import GenericDal from './genericDal';
import IUserDal from './IUserDal';
import { User } from '../entity/User';


export default class UserDal extends GenericDal<User> implements IUserDal {
    constructor(repo: Repository<User>) {
        super(repo);
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await this._repo.findOne({ email: email});
    }
}
