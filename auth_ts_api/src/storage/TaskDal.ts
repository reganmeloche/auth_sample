import { Repository } from 'typeorm';
import GenericDal from './genericDal';
import ITaskDal from './ITaskDal';
import { Task } from '../entity/Task';


export default class TaskDal extends GenericDal<Task> implements ITaskDal {
    constructor(repo: Repository<Task>) {
        super(repo);
    }

    public async getByUserId(userId: string): Promise<Task[]> {
        return await this._repo.find({ userId: userId});
    }
}
