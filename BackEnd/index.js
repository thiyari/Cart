const express = require('express')
const app = express()
var mongoose = require('mongoose')
var routes = require('./routes/routes')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors(
    {
      origin: "http://localhost:4200"
    }
   
  ));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({extended: false}));
const checkDB = async()=>{
    try{
        // mongodb connection string
        // configure built-in role actions as "atlas admin" in cloud atlas mongoDB data access
        const con = await mongoose.connect("mongodb://127.0.0.1:27017/cart",{
        })
        console.log(`MongoDB connected:${con.connection.host}`)
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}


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