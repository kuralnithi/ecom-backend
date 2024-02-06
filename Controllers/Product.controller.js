const productModel = require("../Models/productModel")

//Get Products API - /api/v1/products


exports.addproducts = async (req,res)=>{

try {
    
    const query = { name: req.body.name};
    const update = { $set: req.body};
    const options = { upsert: true,new:true };

const addproducts = await productModel.updateOne(query, update, options);



if(!addproducts){
    console.log("error creating product",addproducts);
return    res.status(500).json({message:"err in adding product"})
}
console.log("product added successfully");
res.status(200).json({message:"product added successfully", data: addproducts})

} catch (error) {
    console.log(error);
    res.status(500).json({message:"err in adding product", data:error})
}






}

exports.getProducts = async (req,res)=>{
try {

    const products = await productModel.find({})

    res.status(200).json({message:"get products woking",products})
    
    
} catch (error) {

    res.status(500).json({message:error.message})
    

}


}


//Get Single Product API - /api/v1/product/:id

exports.getSingleProduct = async(req,res)=>{
    
    try {

    const product = await productModel.findById(req.params.id)

res.status(200).json({message:"get single products woking",product});

}catch(error){

res.status(500).json({message:"err in getting product",error})
    
}


}
