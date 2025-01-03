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



module.exports.createOrdersDBService = (orderDetails) => {
        return new Promise(function myFn(resolve,reject){
                async function insert(){
                        await productsModel.orders.create({
                                orderid: orderDetails.orderid,
                                firstname: orderDetails.firstname,
                                lastname: orderDetails.lastname,
                                email: orderDetails.email,
                                phone: orderDetails.phone,
                                shippingaddress: orderDetails.shippingaddress,
                                ordersplaced: orderDetails.ordersplaced,
                                grandtotal: orderDetails.grandtotal,
                                paymentstatus: orderDetails.paymentstatus
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
