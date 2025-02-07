const express = require('express')
const app = express()
var mongoose = require('mongoose')
var routes = require('./routes/routes')
const cors = require('cors')
const bodyParser = require('body-parser')
require("dotenv").config();

app.use(cors(
    {
      origin: process.env.CLIENT_URI
    }
   
  ));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({extended: false}));
const checkDB = async()=>{
    try{
        // mongodb connection string
        // configure built-in role actions as "atlas admin" in cloud atlas mongoDB data access
        const con = await mongoose.connect(`${process.env.MONGO_DB_URI}/cart`,{
        })
        console.log(`MongoDB connected:${con.connection.host}`)
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}

var nm = require('nodemailer');
let savedOTPS = {};
var transporter = nm.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'ts.manikanth@gmail.com',
            pass: 'lkyblvjtrxjhccmk'
        }
    }
);

app.post('/sendotp', (req, res) => {
    let email = req.body.email;
    let digits = '0123456789';
    let limit = 6;
    let otp = ''
    //generating random otp
    for (i = 0; i < limit; i++) {
        otp += digits[Math.floor(Math.random() * 10)];

    }
    var options = {
        from: 'ts.manikanth@gmail.com',
        to: `${email}`,
        subject: "Testing node emails",
        html: `<p>Enter the otp: ${otp} to verify your email address</p>`

    };
    transporter.sendMail(
        options, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send("couldn't send")
            }
            else {
                savedOTPS[email] = otp;
                //Delete the saved OTP after 1 minute expiry
                setTimeout(
                    () => {
                        delete savedOTPS.email
                    }, 60000 // setting time for 1 minute 
                )
                res.send("sent otp")
            }

        }
    )
})

app.post('/verify', (req, res) => {
    let otpreceived = req.body.otp;
    let email = req.body.email;
    if (savedOTPS[email] == otpreceived) {
        res.send("Verfied");
    }
    else {
        res.status(500).send("Invalid OTP")
    }
})


app.listen(8086, function port(error)
{
    if(error)
    {
        console.log(error)
    }
    else{
        console.log("Connected to port 8086!")
    }
})

app.use(cors())
app.use(express.json())
app.use(routes)

mongoose.set('strictQuery',true)
checkDB()
