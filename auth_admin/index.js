const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const Lib = require('./lib');
const keys = require('./config/keys');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port = 3400;

const lib = new Lib();

app.get('/', checkToken, function(req, res) {
    // If not logged in, then send to login
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/pages/login.html'));
});

app.post('/login', async (req, res) => {
    const loginResult = await lib.login(req.body.email, req.body.password);

    if (loginResult.success) {
        res.cookie('authcookie', loginResult.loginInfo.token, { maxAge:900000, httpOnly:true } )
        return res.redirect(301, '/');
    } else {
        return res.redirect('/login');
    }
});

app.get('/logout', function(req, res) {
    res.cookie('authcookie', null);
    res.sendFile(path.join(__dirname + '/pages/login.html'));
});

app.get('/users', checkToken, function(req, res) {
    res.sendFile(path.join(__dirname + '/pages/users.html'));
});

app.get('/api/users', checkToken, async (req, res) => {
    const result = await lib.fetchUsers(req.cookies.authcookie);
    res.status(200).send(result);
});

app.get('/new_user', checkToken, function(req, res) {
    res.sendFile(path.join(__dirname + '/pages/new_user.html'));
});

app.post('/new_user', checkToken, async (req, res) => {
    // Ensure password and confirm are the same

    const signupResult = await lib.newAdmin(
        req.body.email, 
        req.body.password, 
        req.cookies.authcookie);

    if (signupResult.success) {
        return res.redirect(301, 'users');
    } else {
        // Handle this differently...
        // e.g. what if the user already exists
        return res.redirect('/');
    }
});

app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

function checkToken (req, res, next) {
    const authcookie = req.cookies.authcookie;
    
    //verify token which is in cookie value
    jwt.verify(authcookie, keys.jwtSecret, (err, data) => {
        if (err){
            res.redirect('/login');
        } 
        else if (data.userId) {
            if (data.claims.indexOf('admin') >= 0) {
                req.user = data;
                next();
            } else {
                res.redirect('/login');
            }
        }
    });
}
