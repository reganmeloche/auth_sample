import { NProm } from '../common/customTypes';
import IDal from './IDal';
import { Task } from '../entity/Task';

export default interface IUserDal extends IDal<Task> {
    getByUserId(userId: string): NProm<Task[]>;
}