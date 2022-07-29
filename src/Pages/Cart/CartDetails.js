import React, { Component } from 'react'

export default class CartDetails extends Component {

  render() {
    return (
      <div>
        {
          this.props.getdata.map((product,index)=>{
            return(
              <div key={index}>
                <div>{product.name}</div>
                            <div>{product.prices[0].amount}</div>
                            <div>{product.attributes[0].name}: {
                            product.attributes[0].items.map(size=>{
                                return(
                                    <div>{size.value}</div>
                                )
                            })
                            }</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
