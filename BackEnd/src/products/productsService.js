var productsModel = require('./productsModel')

module.exports.createProductsDBService = (productDetails) => {
    return new Promise(function myFn(resolve,reject){
            async function insert(){
                    await productsModel.products.create({
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