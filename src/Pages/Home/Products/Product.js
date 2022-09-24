import React, { Component } from 'react'
import Cloth from './Cloth'
import './Product.css'
import {withParams} from '../../customhook/HOC'
import Cart from '../../Cart/Cart'



 class Product extends Component {

  state={
    category: [],
    categoryName:""
  }

    componentDidMount=()=>{
      const name=this.props.params.nameId;
      
      this.fetchCategory(name)
      // console.log(this.props.params.nameId)
      
    }
    
    async fetchCategory(name){
      const CATEGORY_QUERY= `       
        query getcategory($title: String!){
  category(input: {title: $title}){
  name,
  products{
    id,
    name,
    inStock,
    description,
    category,
    brand,
    gallery,
    attributes{
      id,
      name,
      type,
      items{
        displayValue,
        value,
        id
      }
    },
    prices{
      currency{
        label,
        symbol
      },
      amount
    }
  }
}
}
        `

      
      await fetch('http://localhost:4000/',{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({query:CATEGORY_QUERY,variables:{title: name}})
      })
      .then(res=> res.json())
      .then(result=>
        {
          
          this.setState({category: result.data.category.products})
          console.log(result)
          // console.log(this.state.categoryName)
          
        })
    }
  render()
  {
    console.log(this.props);
    return (
      <div>
        {/* <div>Name: {name} </div> */}
        <div className='categoryName' >Category Name: {this.props.params.nameId}</div>
        <div className='products'>
        {
            this.state.category.map((cloth,index)=>{
                return(
                    <Cloth
                    key={index}
                    cloth={cloth}
                    />
                )
            })
        }
        </div>
      </div>

    )
  }
}

export default withParams(Product)