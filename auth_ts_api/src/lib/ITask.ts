import { Prom } from '../common/CustomTypes';
import { Task } from '../entity/Task';
import TaskCreate from '../lib/models/TaskCreate';
import BaseResult from '../lib/models/BaseResult';

export default interface ITask {
    create(model: TaskCreate, userId: string): Prom<BaseResult>;
    complete(taskId: string, userId: string): Prom<void>;
    update(model: Task, userId: string): Prom<void>;
    getByUserId(userId: string): Prom<Task[]>;
    delete(id: string, userId: string): Prom<void>;
}