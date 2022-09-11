import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { Query } from 'react-apollo'
import './ClothDetails.css'
import { withParams } from '../../customhook/HOC';



class ClothDetails extends Component {
  state = {
    productData: []
  };

  componentDidMount() {
    this.fetchProduct();
    console.log(this.props)
  }

  fetchProduct() {
    const productId = this.props.params.id;
    //  console.log(productId);

    const PRODUCT_QUERY = `
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

    fetch('http://localhost:4000/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PRODUCT_QUERY, variables: { id: productId } })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.setState({ productData: result.data.product })
        console.log(this.state.productData)
        // console.log(this.state.categoryName)
      })
  }

  render() {
    console.log(this.state.productData.gallery)
    return (
      <div className='clothcontainer'>
        <div>
          <div><img  src="" alt='' /></div>
        </div>
        <div className='detailsgroup'>
          <div>Name: {this.state.productData.name}</div>
          <div>brand: {this.state.productData.brand}</div>
          <div>Price</div>
          <div>Button</div>
          <div>Description</div>
        </div>
      </div>

    )
  }
}

export default withParams(ClothDetails)