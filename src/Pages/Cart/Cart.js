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
                            {
                                this.props.cart.map((element => {
                                    return (
                                        <div>

                                            <div className='itembox'>
                                                <div className='singleitem'>
                                                    <div className='itemdetails'>
                                                        <div className='itemtext'>
                                                            <div className='nameprice'>
                                                                <div className='productname'>{element.name}</div>
                                                                <div className='productprice'>{element.prices[0].amount}</div>
                                                            </div>
                                                            <div className='title'>{element.attributes[0].name}:
                                                            <div >
                                                            {
                                                                element.attributes.map(attribute => {
                                                                    return (
                                                                        <div>
                                                                            {
                                                                                attribute.items &&
                                                                                <div className='sizeframe'>
                                                                                    {
                                                                                        attribute.items.map(size=>{
                                                                                            return (
                                                                                                <div className='sizevalue'>{size.value}</div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                                
                                                                            }
                                                                        </div>
                                                                    
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
                                                    <div>
                                                        Image
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }))
                            }
                            <div>
                                <NavLink to={`/cart`}>View Bag</NavLink>
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