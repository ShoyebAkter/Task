import React, { Component } from 'react'
import Cloth from './Cloth'
import './Product.css'



export default class Product extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            clothes: this.props.data.category.products
        }
    }
  render()
  {
    return (
      <div>
        <div>{this.props.data.category.name}</div>
        <div className='products'>
        {
            this.state.clothes.map((cloth,index)=>{
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
