import React, { Component } from 'react'
import Header from './Header'
import Product from './Products/Product'

export default class Home extends Component {
    constructor(props){
        super(props);
        console.log(props)
    }
  render() 
  {
    return (
      <div>
        <Header/>
        <Product data={this.props.data}/>
      </div>
    )
  }
}
