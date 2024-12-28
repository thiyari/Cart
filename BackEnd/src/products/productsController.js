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


    

module.exports = {
    createProductsControllerFn,
    fetchProductsControllerFn
}