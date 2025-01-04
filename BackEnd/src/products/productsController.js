const crypto = require("crypto");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

let salt_key = process.env.SALT_KEY
let merchant_id = process.env.MERCHANT_ID
var productsService = require('./productsService');

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

    
var phonepeControllerFn = async(req, res) => {

    try{
        console.log(req.body)
        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:8086/api/phonepe/status/?id=${merchantTransactionId}`,
            redirectMode: "POST",
            mobileNumber: req.body.number,
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

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

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
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    // CHECK PAYMENT STATUS
    axios.request(options).then(async(response)=>{
        if(response.data.success === true){
            const url = 'http://localhost:4200/success'
            return res.redirect(url)
        } else {
            const url = 'http://localhost:4200/failure'
            return res.redirect(url)
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}
module.exports = {
    createProductsControllerFn,
    fetchProductsControllerFn,
    createOrdersControllerFn,
    fetchOrdersControllerFn,
    phonepeControllerFn,
    phonepestatusControllerFn
}