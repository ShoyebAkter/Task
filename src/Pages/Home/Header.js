import React, { Component } from 'react'
import Cart from '../Cart/Cart'
import Currencies from '../currency/Currencies'
import './Header.css'

export default class Header extends Component {
    render() {
        return (
            <div class="topnav" id="myTopnav">
                <div>
                <a href="#home" class="active">Home</a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                </div>
                {/* <div>
                    Button
                </div> */}
                <div class="dropdown">
                    <button class="dropbtn">Currency
                    </button>
                    <div class="dropdown-content">
                        <Currencies />
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Cart
                    </button>
                    <div class="dropdown-content">
                        <Cart getdata={this.props.getdata}/>
                    </div>
                </div>
            </div>
        )
    }
}
