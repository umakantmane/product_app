import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from 'react-router-dom';
import ProductIndexComponent from './component/product/ProductIndexComponent';
import CreateProductComponent from './component/product/CreateProductComponent.jsx';
import ViewProductComponent from './component/product/ViewProductComponent';
import UpdateProductComponent from './component/product/UpdateProductComponent.jsx';


class App extends React.Component {
 
 constructor(props){
      super(props);
      this.state = {}
  }
  
  render(){
    return(
      <Router>
        <div>
          <nav class="navbar navbar-inverse">
            <div class="container-fluid">
              <div class="navbar-header">
              <a class="navbar-brand" href="#">Product app</a>
              </div>
              <ul class="nav navbar-nav navbar-right">
                <li><Link to={'/product_lsting'} >Product List</Link></li>
                <li><Link to={'/'}>Home</Link></li>
              </ul>
            </div>
          </nav>
          <div class='container'>
           <Switch>
           <Route exact path='/' component={ProductIndexComponent} />
           <Route exact path='/product_update/:id' component={UpdateProductComponent} /> 
           <Route exact path='/product_view/:id' component={ViewProductComponent} /> 
           <Route exact path='/create_product' component={CreateProductComponent} /> 
           </Switch>   
          </div>
        </div>
      </Router>
    );
  }
};

export default App;