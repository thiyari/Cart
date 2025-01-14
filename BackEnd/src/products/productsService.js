var productsModel = require('./productsModel')

module.exports.createProductsDBService = (productDetails) => {
    return new Promise(function myFn(resolve,reject){
            async function insert(){
                    await productsModel.products.create({
                            pid: productDetails.pid,
                            name: productDetails.name,
                            description: productDetails.description,
                            images: productDetails.images,
                            price: productDetails.price
                    });
                    
            }
            insert().then(function (err){
                    if(err){
                            reject(false)
                    } else {
                            resolve(true)
                    }
            });
    });

}

module.exports.googlepayControllerFnDBService = (txnDetails) => {
        return new Promise(function myFn(resolve,reject){
                async function insert(){
                        await productsModel.googlepaytxns.create({
                                referenceid: txnDetails.referenceid,
                                amount: txnDetails.amount
                        });
                        
                }
                insert().then(function (err){
                        if(err){
                                reject(false)
                        } else {
                                // updating the transaction status in the orders
                                productsModel.orders.updateOne(
                                        { referenceid: txnDetails.referenceid }, 
                                        { $set: { transactionstatus: "Received: GooglePay" }})
                                .catch( error => {
                                        console.log(error);
                                        }
                                );
                                resolve(true)
                        }
                });
        });
    
    }


module.exports.createOrdersDBService = (orderDetails) => {
        return new Promise(function myFn(resolve,reject){
                async function insert(){
                        await productsModel.orders.create({
                                orderid: orderDetails.orderid,
                                name: orderDetails.name,
                                email: orderDetails.email,
                                phone: orderDetails.phone,
                                shippingaddress: orderDetails.shippingaddress,
                                city: orderDetails.city,
                                state: orderDetails.state,
                                pin: orderDetails.pin,
                                ordersplaced: orderDetails.ordersplaced,
                                grandtotal: orderDetails.grandtotal,
                                referenceid: orderDetails.referenceid,
                                transactionstatus: orderDetails.transactionstatus
                        });
                        
                }
                insert().then(function (err){
                        if(err){
                                reject(false)
                        } else {
                                resolve(true)
                        }
                });
        });
    
    }
    


module.exports.fetchProductsDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await productsModel.products.find({});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({status: false, data: result})
                }
        })
}

module.exports.fetchPhonepetxnDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await productsModel.phonepetxns.find({});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({status: false, data: result})
                }
        })
}


module.exports.fetchOrdersDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await productsModel.orders.find({});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({status: false, data: result})
                }
        })
}

module.exports.fetchGooglepayDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await productsModel.googlepaytxns.find({});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({status: false, data: result})
                }
        })
}


module.exports.createpaymentsDBService = (paymentsDetails) => {
        return new Promise(function myFn(resolve,reject){
                async function insert(){
                        await productsModel.phonepetxns.create({
                                referenceid: paymentsDetails.referenceid,
                                transactionid: paymentsDetails.transactionid,
                                amount: paymentsDetails.amount
                        });
                        
                }
                insert().then(function (err){
                        if(err){
                                reject(false)
                        } else {
                                // updating the transaction status in the orders
                                productsModel.orders.updateOne(
                                        { referenceid: paymentsDetails.referenceid }, 
                                        { $set: { transactionstatus: "Received: PhonePe" }})
                                .catch( error => {
                                        console.log(error);
                                        }
                                );
                                resolve(true)
                        }
                });
        });
    
    }
    
    

module.exports.paypalControllerFnDBService = (txnDetails) => {
        return new Promise(function myFn(resolve,reject){
                async function insert(){
                        await productsModel.paypaltxns.create({
                                referenceid: txnDetails.referenceid,
                                transactionid: txnDetails.transactionid,
                                transaction_date: txnDetails.transaction_date,
                                items: txnDetails.items,
                                grandtotal: txnDetails.grandtotal
                        });
                        
                }
                insert().then(function (err){
                        if(err){
                                reject(false)
                        } else {
                                // updating the transaction status in the orders
                                productsModel.orders.updateOne(
                                        { referenceid: txnDetails.referenceid }, 
                                        { $set: { transactionstatus: "Received: PayPal" }})
                                .catch( error => {
                                        console.log(error);
                                        }
                                );
                                resolve(true)
                        }
                });
        });
    
    }


module.exports.fetchPaypalDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await productsModel.paypaltxns.find({});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({status: false, data: result})
                }
        })
}


module.exports.razorpayControllerFnDBService = (txnDetails) => {
        return new Promise(function myFn(resolve,reject){
                async function insert(){
                        await productsModel.razorpaytxns.create({
                                referenceid: txnDetails.referenceid,
                                transactionid: txnDetails.transactionid,
                                amount: txnDetails.amount
                        });
                        
                }
                insert().then(function (err){
                        if(err){
                                reject(false)
                        } else {
                                // updating the transaction status in the orders
                                productsModel.orders.updateOne(
                                        { referenceid: txnDetails.referenceid }, 
                                        { $set: { transactionstatus: "Received: Razorpay" }})
                                .catch( error => {
                                        console.log(error);
                                        }
                                );
                                resolve(true)
                        }
                });
        });
    
    }


module.exports.fetchRazorpayDBService = () => {
        return new Promise(async function myFn(resolve,reject){
                result = await productsModel.razorpaytxns.find({});
                if(result != undefined && result != null){
                        resolve({status: true, data: result});
                } else {
                        reject({status: false, data: result})
                }
        })
}


        