import { gql } from '@apollo/client'
import { reobserveCacheFirst } from '@apollo/client/core/ObservableQuery'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {CHANGE} from "../../redux/action/action"
import './Currencies.css'


class Currencies extends Component {

    state={
        currencies: []
    }

    componentDidMount() {    
        this.fetchCurrency()
        // console.log(this.props.price)
    }

    newIndex(index){
        this.props.CHANGE(index)
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
            <div className='currencycontainer' >
                {
                    this.state.currencies.map((currency,index)=>{
                        return(
                            <div className='singlecurrency'>
                                <div className='currencyText' onClick={()=>this.newIndex(index)}>{currency.label}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(null,{CHANGE})(Currencies);