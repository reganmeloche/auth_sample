import auth from './AuthHandler';
import tasks from './TaskHandler';
import admin from './AdminHandler';

export default function (app: any, dependencies: any) {
    auth(app, dependencies.authLib);
    tasks(app, dependencies.taskLib);
    admin(app, dependencies.authLib, dependencies.userLib);
}
