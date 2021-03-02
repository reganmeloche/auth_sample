import { Prom, NProm } from '../common/CustomTypes';

export default interface IDal<T> {
    insert(model: T): Prom<void>;
    update(model: T): Prom<void>;
    getById(id: string, options?: any): NProm<T>;
    getAll(): Prom<T[]>;
    delete(id: string): Prom<void>;
}