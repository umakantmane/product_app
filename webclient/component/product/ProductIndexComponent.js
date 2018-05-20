import React, { Component } from 'react';
import {Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import params from './../../config/config';
class ProductIndexComponent extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            getData:[]
        };
       
    }
    deleteItem(id){
        console.log(id);
        if(confirm("Are you sure do delete this record?")) {   
            fetch(params.apiUrl + '/product/' + id, {method: "DELETE"})
                    .then(res=>{
                       this.componentDidMount();
            })
            .catch(error=>{
                console.log("error", error);
            });
        }

    }
    componentDidMount(){

        fetch(params.apiUrl + '/product', {
            method:'GET'
        })
        .then(res=> res.json())
        .then(res=>{
        
            var data = res.result;
            for(var i in data){
                console.log(data[i].product_name);
            }
            this.setState({getData:res});
        })
        .catch(err=>{
            console.log("err",err);
        })
    }
    render(){
        
        return(
                
            <div>
                <Link to={'/create_product'} class='btn btn-success btn-sm' >Create Product</Link><p></p>
                <table class="table table-bordered">
                    <thead>
                        <tr>  
                            <th>Logo</th>
                            <th>Product Name</th>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.getData.map((row, i)=>{
                            return <tr>
                                    <td>
                                        <img src={ row.picture } alt="error" width="50" height="50" />
                                    </td>
                                    <td>{ row.product_name }</td>
                                    <td>{ row.title }</td>
                                    <td>{ row.quantity }</td>
                                    <td>
                                        <span>
                                            <Link to={'/product_view/'+row._id} class="btn btn-info btn-xs">VIEW</Link>&nbsp;&nbsp;
                                            <Link to={'/product_update/'+row._id} class="btn btn-primary btn-xs">UPDATE</Link>&nbsp;&nbsp;
                                            <button onClick={this.deleteItem.bind(this, row._id)} class="btn btn-warning btn-xs">DELETE</button>
                                        </span>    
                                    </td>
                                </tr>
                        })}
                    </tbody>
                </table>
            </div>           
            )
    }
}

export default ProductIndexComponent;
