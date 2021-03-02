import { NProm } from '../common/customTypes';
import IDal from './IDal';
import { User } from '../entity/User';

export default interface IUserDal extends IDal<User> {
    getUserByEmail(email: string): NProm<User>;
}