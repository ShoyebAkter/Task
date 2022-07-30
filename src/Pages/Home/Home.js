import React, { Component } from 'react'
import Header from './Header'
import Product from './Products/Product'

export default class Home extends Component {
    
  render() 
  {
    console.log(this.props)
    return (
      <div>
        <Header getdata={this.props.getdata}/>      
      </div>
    )
  }
}
