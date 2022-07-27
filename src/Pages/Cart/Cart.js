import React, { Component } from 'react'

export default class Cart extends Component {
    
  render() {
    return (
      <div>
        <div>My Bag: {this.props.length} items</div>
        {
        this.props.getdata.length?
        <div>
            <div>{this}</div>
        </div>
        :
        <div>Cart is empty</div>
        }
      </div>
    )
  }
}
