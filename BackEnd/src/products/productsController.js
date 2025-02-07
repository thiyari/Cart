const crypto = require("crypto");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

let salt_key = process.env.PHONE_PE_SALT_KEY
let merchant_id = process.env.PHONE_PE_MERCHANT_ID
let user = process.env.GMAIL_APP_USER_ID
let pass = process.env.GMAIL_APP_PASSWORD
var productsService = require('./productsService');

var nm = require('nodemailer');
let savedOTPS = {};
var transporter = nm.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: user,
            pass: pass
        }
    }
);

    var createProductsControllerFn = async(req,res)=>
        {
            try
            {
                var status = await productsService.createProductsDBService(req.body, res)
                if(status){
                    res.status(200).send({"status":true,"message":"Product created successfully"});
                }
                else {
                    res.status(400).send({"status":false,"message":"Error creating a product"});
                }
            }
            catch(err){
                console.log(err);
            }
        }

    var createOrdersControllerFn = async(req,res)=>
        {
            try
            {
                var status = await productsService.createOrdersDBService(req.body, res)
                if(status){
                    res.status(200).send({"status":true,"message":"Order created successfully"});
                }
                else {
                    res.status(400).send({"status":false,"message":"Error creating an Order"});
                }
            }
            catch(err){
                console.log(err);
            }
        }
    


var fetchProductsControllerFn = async(req,res)=>
    {
        const result = await (productsService.fetchProductsDBService())
        if(result.status){
           return res.status(200).send({message:"Success",records:result.data});
        }
        else {
            return res.status(400).send({message:'Failed',records:result.data});
        }
    }

var fetchPhonepetxnControllerFn = async(req,res)=>
    {
        const result = await (productsService.fetchPhonepetxnDBService())
        if(result.status){
           return res.status(200).send({message:"Success",records:result.data});
        }
        else {
            return res.status(400).send({message:'Failed',records:result.data});
        }
    }
    
    
var fetchOrdersControllerFn = async(req,res)=>
    {
        const result = await (productsService.fetchOrdersDBService())
        if(result.status){
           return res.status(200).send({message:"Success",records:result.data});
        }
        else {
            return res.status(400).send({message:'Failed',records:result.data});
        }
    }

    var paymentsControllerFn = async(req,res)=>
        {
            try
            {
                var status = await productsService.createpaymentsDBService(req.body, res)
                if(status){
                    res.status(200).send({"status":true,"message":"Payment created successfully"});
                }
                else {
                    res.status(400).send({"status":false,"message":"Error creating the payment"});
                }
            }
            catch(err){
                console.log(err);
            }
        }

    
var phonepeControllerFn = async(req, res) => {

    try{
        console.log(req.body)
        const merchantTransactionId = req.body.merchantTransactionID;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.merchantUserID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `${process.env.SERVER_URI}/api/phonepe/status/?id=${merchantTransactionId}`,
            redirectMode: "POST",
            mobileNumber: req.body.phone,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = `${process.env.PHONE_PE_HOST_URI}/pg/v1/pay`

        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data:{
                request: payloadMain
            }
        };

        axios.request(options).then(function (response){
            console.log(response.data)
            return res.json(response.data)
        })
        .catch(function (error){
            console.error(error);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }

}


var phonepestatusControllerFn = async(req, res) => {

    const merchantTransactionId = req.query.id
    const merchantId = merchant_id

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}`+salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
        method: 'GET',
        url: `${process.env.PHONE_PE_HOST_URI}/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    // CHECK PAYMENT STATUS
    axios.request(options).then(async(response)=>{
        let reference_id = ""
        if(response.data.success === true && response.data.code === 'PAYMENT_SUCCESS'){
            reference_id = response.data.data.merchantTransactionId
            const options = {
                url: `${process.env.SERVER_URI}/api/payments`,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                data: {
                  referenceid: response.data.data.merchantTransactionId,
                  transactionid: response.data.data.transactionId,
                  amount: response.data.data.amount/100
                }
              };
              
              axios(options)
                .then(() => {
                    console.log("payment histroy created")
                });
            const url = `${process.env.CLIENT_URI}/phonepetxn/${reference_id}`
            return res.redirect(url)
        } else {
            res.status(500).send({ error: 'Transaction Failed' })
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}


var googlepayControllerFn = async(req,res)=>
    {
        try
        {
            var status = await productsService.googlepayControllerFnDBService(req.body, res)
            if(status){
                res.status(200).send({"status":true,"message":"Googlepay data inserted"});
            }
            else {
                res.status(400).send({"status":false,"message":"Error insertng the data"});
            }
        }
        catch(err){
            console.log(err);
        }
    }

var fetchGooglepaytxnControllerFn = async(req,res)=>
    {
        const result = await (productsService.fetchGooglepayDBService())
        if(result.status){
           return res.status(200).send({message:"Success",records:result.data});
        }
        else {
            return res.status(400).send({message:'Failed',records:result.data});
        }
    }

var paypalControllerFn = async(req,res)=>
        {
            try
            {
                var status = await productsService.paypalControllerFnDBService(req.body, res)
                if(status){
                    res.status(200).send({"status":true,"message":"Paypal data inserted"});
                }
                else {
                    res.status(400).send({"status":false,"message":"Error inserting the data"});
                }
            }
            catch(err){
                console.log(err);
            }
        }


var razorpayControllerFn = async(req,res)=>
        {
            try
            {
                var status = await productsService.razorpayControllerFnDBService(req.body, res)
                if(status){
                    res.status(200).send({"status":true,"message":"Paypal data inserted"});
                }
                else {
                    res.status(400).send({"status":false,"message":"Error insertng the data"});
                }
            }
            catch(err){
                console.log(err);
            }
        }        
        
        
var fetchPaypaltxnControllerFn = async(req,res)=>
    {
        const result = await (productsService.fetchPaypalDBService())
        if(result.status){
           return res.status(200).send({message:"Success",records:result.data});
        }
        else {
            return res.status(400).send({message:'Failed',records:result.data});
        }
    }

    var fetchRazorpaytxnControllerFn = async(req,res)=>
        {
            const result = await (productsService.fetchRazorpayDBService())
            if(result.status){
               return res.status(200).send({message:"Success",records:result.data});
            }
            else {
                return res.status(400).send({message:'Failed',records:result.data});
            }
        }



var deleteUserRequestControllerFn = async(req,res)=>
    {
        var result = null;
        try
        {
            var result = await productsService.deleteUserRequestDBService(req.params.orderid)
            if(result.status){
                return res.send({"status": result.success, "message": result.msg});
            }
            else {
                return res.send({"status": result.success, "message": result.msg});
            }
        }
        catch(err){
            console.log(err);
            res.send({"status":false,"message":err.msg});
        }

    }    


var sendOtpControllerFn = async(req, res) => {
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
                res.send({"status":false,"message":"Unable to send OTP"})
            }
            else {
                savedOTPS[email] = otp;
                //Delete the saved OTP after 1 minute expiry
                setTimeout(
                    () => {
                        delete savedOTPS.email
                    }, 60000 // setting time for 1 minute 
                )
                res.send({"status":true,"message":"OTP was sent successfully"});
            }

        }
    )
}

var verifyOtpControllerFn = async(req, res) => {
    let otpreceived = req.body.otp;
    let email = req.body.email;
    if (savedOTPS[email] == otpreceived) {
        res.send({"status":true,"message":"OTP verified successfully"});
    }
    else {
        res.send({"status":false,"message":"Invalid OTP"})
    }
}

module.exports = {
    createProductsControllerFn,
    fetchProductsControllerFn,
    createOrdersControllerFn,
    fetchOrdersControllerFn,
    phonepeControllerFn,
    phonepestatusControllerFn,
    paymentsControllerFn,
    fetchPhonepetxnControllerFn,
    googlepayControllerFn,
    fetchGooglepaytxnControllerFn,
    paypalControllerFn,
    fetchPaypaltxnControllerFn,
    razorpayControllerFn,
    fetchRazorpaytxnControllerFn,
    deleteUserRequestControllerFn,
    sendOtpControllerFn,
    verifyOtpControllerFn
}