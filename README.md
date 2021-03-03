# Auth Sample Project

This is a 3-part project that demonstrates a custom local auth system for a simple todo web app.

A backend API serves as the main engine and connects to the database. There are two front-end applications - one is a user-facing web application. The other is an admin web application strictly for admin tasks. This project shows how to scope functionality to these separate types of users.

All the projects use node, and the suite can be run with the followign commands, in four separate terminals. For each project, `cd` into it, run `npm install`, and then `npm start`. The user-facing web app is created using create-react-app and requires two separate terminals - one for the client app, and one for the thin server that talks to the backend API.


## Auth Typescript API (auth_ts_api)

This is the backend system that serves as the main engine for the two front-end applications. 

To run the project:
- `cd auth_ts_api`
- `npm install`
- `npm start`
- Runs on port 3500 by default

### Technologies
- Node.js
- Typescript: Also ts-node for running typescript
- Express: For running a server
- Passport: For handling auth - more specifically passport-local and and passport-jwt
- Postgres: Database
- TypeORM: ORM for the DB
- Bcrypt: For hashing passwords

### Useful Resources
- https://auth0.com/blog/use-typescript-to-create-a-secure-api-with-nodejs-and-express-getting-started/
- https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript
- https://typeorm.io/#/
- https://medium.com/@keikaavousi/nodejs-authentication-with-jwt-and-cookies-3fb1c8c739ba

### General User Flow
1. User signs up with email and password: `POST /api/signup`
- Verifies the user doesn't already exist
- Saves new user into the system with a hashed password

2. User logs in with email and password: `POST /api/login`
- Verifies login info is correct
- Returns a JSON Web Token (jwt) containing the user info and expiry time
- User uses this token for subsequent calls until the token expires

3. Create a task: `POST /api/task` - only property in body is "description"
- This stores an uncompleted task associated to the user in the db
- Returns a GUID identifying the task

4. View all tasks: `GET /api/task`
- Returns all tasks associated with a user

5. Complete a task: `PUT /api/task/{guid}/complete`
- Updates the task to be complete

6. Delete a task: `DELETE /api/task/{guid}`
- Hard-deletes the task from the db


## Admin web app (auth_admin)

This project is a simple front-end project that serves as an admin dashboard for todo app. The front-end code is simple vanilla JS, JQuery, and Bootstrap v5. It connects to the related backend API and gives access to endpoints that are protected with an admin scope. 

When the user logs in, a JWT token is saved as a cookie, and that is then tacked on to subsequent requests. When the request reaches the API, the token is unpacked and the claims are verified. If the user has an admin scope, then the result is returned. If not, an error is returned.

To run:
- `cd auth_admin`
- `npm install`
- `npm start`
- Runs on port 3400 by default

### Functionality
- Log in
- Create a new admin user
- View all users


## User app

This project is a front-end web app that a user can use to create and complete their todo tasks. It is a react application that uses create-react-app.

The flow is generally the same as the admin web app, but it checks for the 'regular' claim.

Since it's used with create-react-app, there are actually two projects - the front-end react code, and the server code that will interact with the backend API.

To run, open up two terminals.

Run the server portion in the first terminal:
- `cd auth_web`
- `npm install`
- `npm start`
- Runs on port 3300 by default

Run the client portion in the second terminal:
- `cd auth_web/client`
- `npm install`
- `npm start`
- Runs on port 3000 by default

### Functionality
- Sign up as a new user
- Log in
- View your tasks
- Complete a task
- Create a new task


## Next Steps
- Clean up error-handling
- Implement email verification and ability to change passwords
- Improved logout functionality
- Postman library for developing and testing
- Tests
