import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className='leftside'>
            <div>Women</div>
            <div>Men</div>
            <div>Kids</div>
        </div>
        <div className='middle'>
            <div>Button</div>
        </div>
        <div className='rightside'>
            <div>Currency</div>
            <div>Cart</div>
        </div>
      </div>
    )
  }
}
