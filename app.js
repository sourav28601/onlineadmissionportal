const express = require('express');
const connectDB = require('./db/connectdb.js');
const cookieParser = require('cookie-parser')

const app = express()  // FUNCTION CREATE
const multer  = require('multer')
app.use(cookieParser())
// to show message
var session = require('express-session')
var flash = require('connect-flash');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(flash())
const port = process.env.PORT || 4008

const web = require('./routes/web.js')   // ROUTER LINK


// npm body parser
var bodyParser = require('body-parser')

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/',web);      // LOAD ROUTER

app.set('view engine','ejs'); // SET EJS TEMPLATE ENGINE

// app.get('/', (req,res) => {     // ROUTE CREATE
//     res.send('HOME PAGE')
// })

//static files

app.use(express.static('public'))

connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

