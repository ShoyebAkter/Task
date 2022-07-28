import { useQuery, gql } from "@apollo/client";

const PRODUCTS_QUERY = gql`
query{
    
  category(input: { title: "clothes" }) {
    name
    products {
      id,
      name,
      inStock,
      description,
      category,
      brand,
      gallery,
      prices{
        currency{
          label,
          symbol
        },
        amount
      },
      attributes{
        id,
        name,
        type,
        items{
          displayValue,
          value,
          id
        }
      }
    }
  }
}
    
`;

const SINGLEPRODUCT_QUERY=gql`
query {
    product(id:"huarache-x-stussy-le"){
    id,
    name,
    inStock,
    description
  } 
}
`

export {PRODUCTS_QUERY,SINGLEPRODUCT_QUERY};