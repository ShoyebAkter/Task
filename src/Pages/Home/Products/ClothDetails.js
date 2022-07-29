import React, { Component } from 'react';

const SINGLEPRODUCT_QUERY=`
  
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
    constructor(){
        super()
        // console.log(props)
        this.state={
            productData: []
        }

        console.log(this.state.productData.name)

    }

    componentDidMount(){
      fetch('http://localhost:4000/',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ query: SINGLEPRODUCT_QUERY})
        })
        .then(res=>res.json())
        .then(result=>{
          const product=result.data.product;
          console.log(product)
          this.setState({productData: product})
        })
        
    }

  render() 
  
  {
    return (
      <div> 
        <div>ClothDetails</div>
        <div>{this.state.productData.name}</div>
        <div>{this.state.productData.id}</div>
        <div>{this.state.productData.prices}</div>
      </div>
      
    )
  }
}
