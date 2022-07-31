import { gql } from '@apollo/client'
import React, { Component } from 'react'


export default class Currencies extends Component {

    state={
        currencies: []
    }

    componentDidMount() {
        this.fetchCurrency()
    }

    fetchCurrency() {
        const CURRENCY_QUERY = {
            query:  `
            query{
            currencies{
            label,
            symbol
                }
            }`
        }
       
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(CURRENCY_QUERY)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                this.setState({currencies: result.data.currencies})
            console.log(this.state.currencies)
            })
    }

    

    render() {
        return (
            <div>
                {
                    this.state.currencies.map((currency,index)=>{
                        return(
                            <div>
                                <div onClick={()=>this.props.changeCurrency(index)}>{currency.label}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
