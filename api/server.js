//1. import
const express = require('express');
const server = express();
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('./Users/users-router');
const authRouter = require('./Auth/auth-router');

const { protected } = require('./Auth/auth-middleware');

 
//2. middleware
server.use(express.json());
server.use(
    session(
        {
            name: "PizzaOrder",  //connect.sid
            secret: "En lezzetli pizzalar bizde!...",  //env'den alınacak.
            cookie: {
                maxAge: 1000*60*60*3, //3 saat geçerli olacak
                httpOnly: false,
                secure: false,  //https üzerinden iletişim
            },
            resave: false,
            saveUninitialized: false,
            store: new KnexSessionStore({
                tablename: 'sessions',  //Default'u aynısı
                sidfieldname:'sid', //Default'u aynısı
                knex: require('../data/db-config'),  //vermezsem kendi DB oluşturur.
                createtable: true,
                clearInterval: 1000*60 // expire olmuş sessionları 10sn sonra otomatik siler.
            })
        }
    ))

//3. router
server.get('/', (req,res)=>{
    res.json({message: "Server up and running..."})
})
server.use('/api/users', protected, usersRouter)
server.use('/api/auth', authRouter)
//4. error middleware

//export
module.exports = server;