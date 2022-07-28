import React, { Component } from 'react';

export default class ClothDetails extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            data: []
        }
    //    console.log(this.props)
       this.setData=()=>{
        fetch('http://localhost:4000/',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: `
                {
                    product(id:"huarache-x-stussy-le"){
                    id,
                    name,
                    inStock,
                    description
                  } 
                }
                `
            })
        })
        .then(res=>res.json())
        .then(data=>{this.state.data(data)})
       }

       console.log(this.state.data)

    }

  render() {
    return (
      <div>ClothDetails</div>
    )
  }
}
