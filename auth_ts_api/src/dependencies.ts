// Import interfaces
import IUser from './lib/IUser';
import IAuth from './lib/IAuth';
import ICrypto from './lib/ICrypto';
import ITask from './lib/ITask';

// Import DAL
import { User } from './entity/User';
import { Task } from './entity/Task';
import UserDal from './storage/UserDal';
import TaskDal from './storage/TaskDal';

// Import Libs
import UserLib from './lib/UserLib';
import AuthLib from './lib/AuthLib';
import CryptoLib from './lib/CryptoLib';
import TaskLib from './lib/TaskLib';


function install(conn: any) {
    const userDal = new UserDal(conn.getRepository(User));
    const taskDal = new TaskDal(conn.getRepository(Task));

    const userLib: IUser = new UserLib(userDal);
    const cryptoLib: ICrypto = new CryptoLib();
    const authLib: IAuth = new AuthLib(userLib, cryptoLib);
    const taskLib: ITask = new TaskLib(taskDal);

    return {
        userLib,
        authLib,
        taskLib,
    };
}

// May want to have a strongly typed object that gets returned...
export default function(conn: any) {
    return install(conn);
}