https://auth0.com/blog/use-typescript-to-create-a-secure-api-with-nodejs-and-express-getting-started/

express:
https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript

typeorm:
https://typeorm.io/#/

https://medium.com/@keikaavousi/nodejs-authentication-with-jwt-and-cookies-3fb1c8c739ba


## Auth Admin

This project is a proof of concept for a customized local login system for a simple web app.

This project uses Node.js and Express for running the web server. The front-end code is simple vanilla JS, JQuery, and Bootstrap v5

It connects to the related backend API and gives access to endpoints that are protected with an admin scope. 

When the user logs in, a jwt token is saved as a cookie, and that is then tacked on to subsequent requests. When the request reaches the API, the token is unpacked and the claims are verified. If the user has an admin scope, then the result is returned. If not, an error is returned.


## Auth Typescript API

This project is a proof of concept for a customized local login system for a simple todo app.


### Technologies

The following technologies are used in the project:
- Node.js
- Typescript: Also ts-node for running typescript
- Express: For running a server
- Passport: For handling auth - more specifically passport-local and and passport-jwt
- Postgres: Database
- TypeORM: ORM for the DB
- Bcrypt: For hashing passwords


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


### Admin notes

There is also a separate scope for admin functionality. 

Create an admin: `POST /api/admin` with email and password
- Only admins can create admins

View all users: `GET /api/user`


### Other Features

- Separation of code: Separate code for route handlers, business logic, and data access
- Custom dependency injection


### Next Steps

- Will be adding two separate web applications to communicate with the api: One for general users, and one for admins
- Implement email verification and ability to change passwords
- Improved logout functionality
- Postman library for developing and testing
- Tests


TS api: 3500
admin: 3400
web: 3300
client: 3000