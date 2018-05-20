"use strict";
var productModel = require('../models/Products')
  , fs = require('fs')  
  , multer = require('multer');

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, BASE_URL+ "/uploads");
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({storage: Storage});
function fileUpload(req, res){

    return new Promise((resolve, reject)=>{
        upload(req, res, function(err, result){
            if(err) reject(err)
            else resolve(result);
        });
    });
}

/** 
  * responseParser() 
  * params res:expressjs respose object
  * params err:callback first error param
  * params result: callback second result param
*/
function responseParser(res, err, result){
    if (err)
        return res.send({error:err});
    return res.send(result);    
};

productModel = new productModel();
module.exports = function(app){

    /** 
      * route /product: create new product
      * upload: upload file using multer module
      * http method:POST
    */

    app.post('/product',upload.single('picture'), function(req, res){
        req.body.picture = "uploads/" + req.file.originalname; 
        productModel.postData = req.body;
        productModel.CreateProduct(function(err, result){
            responseParser(res, err, result);
        });
    });

    /** 
      * route /product/{id}: update existing record 
      * upload: upload file using multer module
      * http method:PUT
    */

    app.put('/product/:id',upload.single('picture'), function(req, res){

        if (req.file != undefined)
        req.body.picture = "uploads/" + req.file.originalname; 
        productModel.id = req.params.id;
        productModel.postData = req.body;
        productModel.UpdateProduct(function(err, result){
            responseParser(res, err, result);
        });
    });
    
    /** 
      * route /product: get all products
      * http method:GET
    */

    app.get('/product', function(req, res){
        productModel.GetAllProducts(function(err, result){
            responseParser(res, err, result); 
        });
    });

    /** 
      * route /product/{id} : get product based on id
      * http method:GET
    */

    app.get('/product/:id', function(req, res){

        productModel.id = req.params.id;
        productModel.GetProductById(function(err, result){
            responseParser(res, err, result);
        });
    });

     /** 
      * route /product/{id} : delete record based on id
      * http method:GET
    */

    app.delete('/product/:id', function(req, res){
        productModel.id = req.params.id;
        productModel.DeteProductById(function(err, result){
            if(err) {
                res.send({error:err});
            } else {
                fs.unlink(BASE_URL + '/' + result.picture, function(err, res){});
                res.send({result:result});
            }  
        });
    });

};
