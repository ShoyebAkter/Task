import React, { Component } from 'react'
import {connect} from 'react-redux'


class CartDetails extends Component {
  state={
    cartDetails:[]
  }


  render() {
    console.log(this.state.cartDetails)
    return (
      <div>
        {
          this.props.cartDetails.map((product,index)=>{
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

function mapStateToProps(state){
  return{
    cartDetails: state.cartreducer.carts
  }
}


export default connect(mapStateToProps)(CartDetails)