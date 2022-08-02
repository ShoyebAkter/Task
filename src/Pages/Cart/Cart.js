import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux/es/exports'

class Cart extends Component {
    state={
        cart:[]
    }

  render() {
    console.log(this.props.getdata)
    console.log(this.props)
    return (
      <div>
        <div>My Bag: {this.props.cart.length} items</div>
        {
        this.props.cart.length?
        <div>
            {
                this.props.cart.map((element=>{
                    return(
                        <div>
                            <div>{element.name}</div>
                            <div>{element.prices[0].amount}</div>
                            <div>{element.attributes[0].name}? {
                            element.attributes[0].items.map(size=>{
                                return(
                                    <div>{size.value}</div>
                                )
                            })
                            }
                            </div>
                            
                        </div>
                    )
                }))
            }
            <NavLink to={`/cart`}>View Bag</NavLink>
        </div>
        :
        <div>Cart is empty</div>
        }
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
return{
    cart: state.cartreducer.carts,
}
}
export default connect(mapStateToProps)(Cart);