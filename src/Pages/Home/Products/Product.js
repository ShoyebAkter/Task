import React, { Component } from 'react'
import Cloth from './Cloth'
import './Product.css'
import {withParams} from '../../customhook/HOC'
import Cart from '../../Cart/Cart'
import { connect } from 'react-redux'



 class Product extends Component {

  state={
    category: [],
    categoryName:"",
    isLoading:false
  }

    componentDidMount=()=>{
      
      this.fetchCategory(this.props.categoryName)
      // console.log(this.props.params.nameId)
      
    }
    componentDidUpdate(prevProps) {
      if (prevProps.categoryName !== this.props.categoryName) {
        this.fetchCategory(this.props.categoryName)
      }
      // console.log(prevProps.categoryName);
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
      this.setState({isLoading:true});
      
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
          this.setState({isLoading:false})
          // console.log(this.state.categoryName)
          
        })
    }
  render()
  {
    console.log(this.props);
    return (
      this.state.isLoading ?
      <div>Loading.....</div>
      :
      <div>
        {/* <div>Name: {name} </div> */}
        <div className='categoryName' >{this.props.categoryName}</div>
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
const mapStateToProps = (state) => {
  return {
    
    categoryName: state.cartreducer.category
  }
}

export default connect(mapStateToProps)(Product)