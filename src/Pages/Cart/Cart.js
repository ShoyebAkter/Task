import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux/es/exports'
import './Cart.css'

class Cart extends Component {
    state = {
        cart: []
    }

    render() {
        console.log(this.props.getdata)
        console.log(this.props)
        return (
            <div className='cartcontainer'>

                {
                    this.props.cart.length ?
                        <div className='itemcontainer' >
                            <div className='totalitem'>My Bag: {this.props.cart.length}items</div>
                            <div className='itembox'>
                            {
                                this.props.cart.map((element => {
                                    return (
                                        <div>

                                            
                                                <div className='singleitem'>
                                                    <div className='itemdetails'>
                                                        <div className='itemtext'>
                                                            <div className='nameprice'>
                                                                <div className='productname'>{element.name}</div>
                                                                <div className='productprice'>{element.prices[0].amount}</div>
                                                            </div>
                                                            <div className='title'>{element.attributes[0].name}:
                                                            <div className='sizeframe'>
                                                            {
                                                                element.attributes[0].items.map(attribute => {
                                                                    return (
                                                                        <div className='sizevalue'>{attribute.value}</div>
                                                                    
                                                                    )
                                                                })
                                                            }
                                                            </div>
                                                             
                                                            </div>
                                                        </div>
                                                        <div className='buttonarea'>
                                                            <div><button>plus</button></div>
                                                            <div>1</div>
                                                            <div><button>Minus</button></div>
                                                        </div>

                                                    </div>
                                                    <div  >
                                                        <img className='imagecontainer'  src={element.gallery[0]} alt=""/>
                                                    </div>
                                                </div>
                                            </div>

                                        
                                    )
                                }))
                            }
                            </div>
                            <div className='total'>
                                <div> Total </div>
                                <div> Price </div>
                            </div>
                            <div>
                                <NavLink to={`/cart`}>View Bag</NavLink>
                                <NavLink to={`/cart`}>Checkout</NavLink>
                            </div>
                        </div>
                        :
                        <div>Cart is empty</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartreducer.carts,
    }
}
export default connect(mapStateToProps)(Cart);