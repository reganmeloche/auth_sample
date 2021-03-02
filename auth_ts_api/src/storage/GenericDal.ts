import { Repository } from 'typeorm';
import IDal from './IDal';

export default class GenericOrm<T> implements IDal<T> {
    protected _repo: Repository<T>;

    constructor(repo: Repository<T>) {
        this._repo = repo;
    }

    public async insert(model: T): Promise<void> {
        await this._repo.save(model);
    }

    public async update(model: T): Promise<void> {
        await this._repo.save(model);
    }

    public async getById(id: string, options?: any): Promise<T | null> {
        return await this._repo.findOne(id, options);
    }

    public async getAll(): Promise<T[]> {
        return await this._repo.find();
    }

    public async delete(id: string): Promise<void> {
        const target = await this._repo.findOne(id);
        await this._repo.remove(target);
    }
}
