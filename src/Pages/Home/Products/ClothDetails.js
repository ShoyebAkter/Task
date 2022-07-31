import { gql } from '@apollo/client';
import React, { Component } from 'react';
import {Query} from 'react-apollo'

import { withParams } from '../../customhook/HOC';
const PRODUCT_QUERY=`
query getproduct($id: String!){
  product(id:$id){
  id,
  name,
  inStock,
  description,
  category,
  brand,
  gallery,
  prices{
    currency{
    label,
      symbol
    },
    amount
  },
  attributes{
    id,
    name,
    type,
    items{
      displayValue,
      value,
      id
    }
  }
} 
}
`


class ClothDetails extends Component {
  state={
    productData: [{name:"foo"}]
  };
  
  componentDidMount(){
    // this.fetchProduct();
    console.log(this.props)
  }

  fetchProduct(){
   const productId="";

    fetch('http://localhost:4000/',{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({query:PRODUCT_QUERY,variables:{title: productId}})
      })
      .then(res=> res.json())
      .then(result=>
        {
          
          // this.setState({category: result.data.category.products})
          // console.log(this.state.category)
          // console.log(this.state.categoryName)
        })
  }

  render() 
  
  {
    console.log(this.props)
    return (
      <div> 
        <div>Pic</div>
        <div>Name</div>
        <div>Size</div>
        <div>Price</div>
        <div>Button</div>
        <div>Description</div>
      </div>
      
    )
  }
}

export default withParams(ClothDetails)