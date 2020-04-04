const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/Register');
const signin = require('./controllers/Signin');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'ashwin-sekar',
    password : '',
    database : 'face-recognition'
    }
  });


const app = express();

app.use(express.json());
app.use(cors())


app.get('/' , (req,res) => {
    res.json(db.users)
})


app.post('/signin' , (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register' , (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res) => {profile.getProfile(req,res,db)})

app.put('/image',(req,res) => {image.handleimage(req,res,db)})

app.post('/imageurl', (req, res) => { image.handleapi(req, res)})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
  })
