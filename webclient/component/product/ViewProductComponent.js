import React, { Component } from 'react';
import params from './../../config/config';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class ViewProductComponent extends Component{
    
        constructor(props){
            super(props);
            this.state = {
               data:{},
               redirectoCrud:false
            };
        }
        componentDidMount(){
            fetch("http://localhost:3000/product/"+this.props.match.params.id)
                    .then((res)=>res.json())
                    .then((res)=>{
                        console.log(res);
                    this.setState({data:res});
                    
            });
        }
        deleteItem(id){
            console.log(id);
            if(confirm("Are you sure do delete this record?")) {   
                fetch(params.apiUrl + '/product/' + id, {method: "DELETE"})
                        .then(res=>{
                            this.setState({redirectoCrud:true});
                })
                .catch(error=>{
                    console.log("error", error);
                });
            }
    
        }
	render(){ 
             if(this.state.redirectoCrud)
             return <Redirect to='/'  />;
             if(!this.state.data) return <h2>Loading...</h2>;
		return(
			<div>
                <h3>Product View</h3>
                <button onClick={this.deleteItem.bind(this, this.state.data._id)} class="btn btn-warning btn-xs">Delete</button>&nbsp;&nbsp;
                <Link to={'/product_update/'+this.state.data._id} class="btn btn-success btn-xs">Update</Link>&nbsp;&nbsp;
                <p></p>
                <ul class="list-group">
                <li class="list-group-item">Product Name: {this.state.data.product_name}</li>
                <li class="list-group-item">Product Title: {this.state.data.title}</li>
                <li class="list-group-item">Product Quantity: {this.state.data.quantity}</li>
                <li class="list-group-item">Product Picture: <img src= {'/'+ this.state.data.picture} alt="error" width="100" height="100" /></li>
                </ul>
            </div>
        );
	}
}

export default ViewProductComponent

