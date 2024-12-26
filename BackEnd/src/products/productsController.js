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

module.exports = {
    createProductsControllerFn
}