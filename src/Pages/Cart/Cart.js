import React, { Component } from 'react'

export default class Cart extends Component {
    constructor(props){
        super(props)
        console.log(props)
    }
  render() {
    return (
      <div>
        <div>My Bag: {this.props.getdata.length} items</div>
        {
        this.props.getdata.length?
        <div>
            {
                this.props.getdata.map((element=>{
                    return(
                        <div>
                            <div>{element.name}</div>
                            <div>{element.prices[0].amount}</div>
                            <div>{element.attributes[0].name}: {
                            element.attributes[0].items.map(size=>{
                                return(
                                    <div>{size.value}</div>
                                )
                            })
                            }</div>
                        </div>
                    )
                }))
            }
        </div>
        :
        <div>Cart is empty</div>
        }
      </div>
    )
  }
}
