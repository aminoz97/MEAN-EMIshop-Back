console.log("Server starting...")

const express = require("express")
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')


//DataBase config
const db = require('./config/db').database;
mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>{
        console.log("Database Connected Successfuly !")
})
    .catch((err)=>{
        console.log("Unable to Connect with database\n",err)
    });


//init app
const app = express();
let port = 3000

//init cors middleware
app.use(cors());
//init bodyParser middleware
app.use(bodyParser());

//Corsing
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

//Route
app.get('/', function (req, res) {
    res.send('<h1>hello world!</h1>'+a)
})

const productRoutes= require('./routes/api/product')
app.use('/api/product',productRoutes)
const commandRoutes= require('./routes/api/command')
app.use('/api/command',commandRoutes)
const userRoutes= require('./routes/api/user')
app.use('/api/user',userRoutes)

//Starting server
app.listen(port, function () {
  console.log('Server listening on port: '+ port +'!')
})
