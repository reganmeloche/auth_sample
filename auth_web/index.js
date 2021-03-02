const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const Lib = require('./src/lib');
const keys = require('./config/keys');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port = 3300;

const lib = new Lib();

app.get('/api/task', checkToken, async (req, res) => {
    const token = req.cookies.authcookie;
    const tasks = await lib.getTasks(token);
    res.status(200).send({tasks});
});

app.post('/api/task/:id/complete', async (req, res) => {
    const token = req.cookies.authcookie;
    const taskResult = await lib.completeTask(req.params.id, token);

    if (taskResult) {
        return res.status(200).send({success: true});
    } else {
        return res.status(200).send({success: false});
    }
});

app.post('/api/login', async (req, res) => {
    const loginResult = await lib.login(req.body.email, req.body.password);

    if (loginResult.success) {
        res.cookie('authcookie', loginResult.loginInfo.token, { maxAge:900000, httpOnly:true } )
        return res.status(200).send(loginResult.loginInfo);
    } else {
        return res.status(200).send({success: false});
    }
});

app.post('/api/signup', async (req, res) => {
    const signupResult = await lib.signup(req.body.email, req.body.password);
    if (signupResult.success) {
        return res.status(200).send({success: true});
    } else {
        return res.status(200).send({success: false});
    }
});

app.post('/api/new_task', checkToken, async (req, res) => {
    const token = req.cookies.authcookie;
    const taskResult = await lib.newTask(req.body, token);

    if (taskResult.success) {
        return res.status(201).send({success:true});
    } else {
        return res.redirect('/login');
    }
});

app.get('/api/logout', function(req, res) {
    res.cookie('authcookie', null);
    return res.sendStatus(200);
});

// Prod setup
if (process.env.NODE_ENV === 'production') {
    // express serves up production assets (main.js, main.css, etc)
    // if any get request comes in and we don't have a handler,
    // then look into that directory and see if we can find it
    app.use(express.static('client/build'));

    // express serves up index.html if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


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
            if (data.claims.indexOf('regular') >= 0) {
                req.user = data;
                next();
            } else {
                res.redirect('/login');
            }
        }
    });
}
