import React, { Component } from 'react';
import {Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import params from './../../config/config';


class UpdateProductComponent extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            errors:{},
            redirectoCrud:false
        };
        this.submitForm = this.submitForm.bind(this);
        this.setProductName = this.setProductName.bind(this);
        this.setProductTitle = this.setProductTitle.bind(this);
        this.setProductQuantity = this.setProductQuantity.bind(this);
        this.setProductPicture = this.setProductPicture.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setFile = this.setFile.bind(this);
    }
    
    setFile(event){
        this.setState({file:event.target.files[0]});
    }
    componentDidMount(){
        fetch(params.apiUrl + "/product/"+this.props.match.params.id)
                .then((res)=>res.json())
                .then((res)=>{
                    this.setState(res);   
        });
    }
    submitForm(event){
        event.preventDefault();
        if(this.validateForm()){
            var data = {
                product_name:this.state.product_name,
                title:this.state.title,
                picture:this.state.picture,
                quantity:this.state.quantity,
            };
            var fd = new FormData();
				fd.append('product_name', this.state.product_name);
                fd.append('title', this.state.title);
                //if (this.state.file != undefined)
				fd.append('picture', this.state.file);
				fd.append('quantity', this.state.quantity);
				fd.append('city', this.state.selectedValue);

                var options = {
					method: 'PUT',
					body: fd
				};
            fetch(params.apiUrl + '/product/'+this.props.match.params.id, options)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("responseJson", responseJson);
                this.setState({redirectoCrud:true});
            })
            .catch((error) => {
                console.error(error);
            });
        }
        else console.log("envalid form");
    }
    setProductName(event){
        this.setState({product_name:event.target.value});
    }
    setProductTitle(event){
        this.setState({title:event.target.value});
    }
    setProductQuantity(event){
        this.setState({quantity:event.target.value});
    }
    setProductPicture(event){
        this.setState({picture:event.target.value});
    }
    validateForm(){

        let fields = this.state;
        let isValid = true;
        let errors = {};
        var arr = ['product_name', 'title', 'quantity'];
        for(let i in arr){
            if(fields[arr[i]] === undefined || fields[arr[i]] === ''){
                errors[arr[i]] = "This field is required!";
                isValid = false;
            }
        }
        this.setState({errors:errors});
        return isValid;
    }
    render(){
        
        if(this.state.redirectoCrud)
          return <Redirect to='/'  />;
        return(         
           
           <div>
               <h3>Update Product</h3>
            <form >
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group ">
                            <label for="name">Product Name:</label>
                            <input type="text" value={this.state.product_name} onChange={this.setProductName} class="form-control" id="name" placeholder="Enter product name" />
                            <span style={{color: "#c53737"}}>{this.state.errors["product_name"]}</span>
                        </div>    	
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group ">
                            <label for="name">Product Title:</label>
                            <input type="text" value={this.state.title} onChange={this.setProductTitle} class="form-control" id="name" placeholder="Enter product title" />
                            <span style={{color: "#c53737"}}>{this.state.errors["title"]}</span>
                        </div>    	
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group ">
                            <label for="name">Product Quantity:</label>
                            <input type="text" value={this.state.quantity} onChange={this.setProductQuantity} class="form-control" id="name" placeholder="Enter product quantity" />
                            <span style={{color: "#c53737"}}>{this.state.errors["quantity"]}</span>
                        </div>    	
                    </div>
                </div>

                <div class="row">
    				<div class="form-group col-sm-6">
                        <label for="file">File:</label>
                        <input type="file" onChange={this.setFile} class="" id="file" />
                      <span style={{color: "#c53737"}}>{this.state.errors["file"]}</span>
                    </div>
	             </div>
                             
                <button onClick={this.submitForm} class="btn btn-primary">Update</button>
                </form>
         </div>
        )
    }
}

export default UpdateProductComponent;
