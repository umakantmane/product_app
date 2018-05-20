"use strict";

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , productsSchema = new Schema({
    product_name: {type: String, required: true, unique: true},
    title: {type:String, required:true},
    quantity: {type: String, required: true},
    picture:{type:String, required:true},
    date: {type: Date, default: Date.now}
});

mongoose.model('ProductModel', productsSchema);
var ProductModel = mongoose.model('ProductModel');
function Product(){};
function findProductById(id){
  
    return new Promise((resolve, reject)=>{
        var productModel = new ProductModel(); 
        ProductModel.findOne({_id:id}, function(err, result){
            if(err) return reject(err);
            return resolve(result);
        }); 
    });

}
Product.prototype.CreateProduct = function(done){
    var productModel = new ProductModel(this.postData);
        productModel.save(done);
};

Product.prototype.UpdateProduct = function(done){

    findProductById(this.id)
    .then(res=>{
        var productModel = new ProductModel(res);
            productModel.product_name = this.postData.product_name;
            productModel.title = this.postData.title;
            productModel.quantity = this.postData.quantity;
            if (this.postData.picture != 'undefined')
            productModel.picture = this.postData.picture;
            productModel.save(done);
    })
    .catch(err=>{
        done(err);
    });
};

Product.prototype.GetAllProducts = function(done){
    ProductModel.find({}, done);
};

Product.prototype.GetProductById = function(done){
    ProductModel.findOne({_id:this.id}, done); 
};

Product.prototype.DeteProductById = function(done){
    ProductModel.findByIdAndRemove(this.id, done);
};

module.exports = Product;








