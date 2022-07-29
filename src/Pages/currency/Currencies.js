import { gql } from '@apollo/client'
import React, { Component } from 'react'

const CURRENCY_QUERY=gql`
query{
    currencies{
      label,
      symbol
    }
}
`

export default class Currencies extends Component {
  render() {
    return (
      <div>Currencies</div>
    )
  }
}
