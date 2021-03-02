import { v4 as uuidv4 } from 'uuid';
import ITask from './ITask';
import ITaskDal from '../storage/ITaskDal';
import { Task } from '../entity/Task';
import TaskCreate from '../lib/models/TaskCreate';
import BaseResult from '../lib/models/BaseResult';
import { NotFound, ValidationError } from '../common/Errors';

export default class TaskLib implements ITask {
    private readonly _taskDal: ITaskDal;

    public constructor(taskDal: ITaskDal) {
        this._taskDal = taskDal;
    }

    public async create(model: TaskCreate, userId: string): Promise<BaseResult> {
        const taskId = uuidv4();
        const newTask = new Task();
        newTask.id = taskId;
        newTask.createDate = new Date();
        newTask.description = model.description;
        newTask.userId = userId,
        newTask.completed = false;
        await this._taskDal.insert(newTask);
        return new BaseResult(taskId);
    }

    public async complete(taskId: string, userId: string): Promise<void> {
        const task = await this.get(taskId, userId);
        if (task.completed) {
            throw new ValidationError('Task already completed');
        }
        task.completed = true;
        task.completeDate = new Date();
        await this.update(task);
    }

    public async update(model: Task): Promise<void> {
        await this._taskDal.update(model);
    }

    public async getByUserId(userId: string): Promise<Task[]> {
        return await this._taskDal.getByUserId(userId);
    }

    public async delete(userId: string): Promise<void> {
        return this._taskDal.delete(userId);
    }

    private async get(taskId: string, userId: string) : Promise<Task> {
        const tasks = await this.getByUserId(userId);
        const task = tasks.find(x => x.id == taskId);

        if (!task) {
            throw new NotFound('Task does not belong to user');
        }

        return task;
    }
}
