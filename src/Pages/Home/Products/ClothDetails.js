import { gql } from '@apollo/client';
import React, { Component } from 'react';
import {Query} from 'react-apollo'
const PRODUCT_QUERY=gql`
query{
  product(id:"huarache-x-stussy-le"){
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


export default class ClothDetails extends Component {
  state={
    productData: [{name:"foo"}]
  };
  constructor(props){
    super(props);
    
    console.log(typeof(this.state.productData))
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
