export const PRODUCT_QUERY = `
query getproduct($id: String!){
  product(id:$id){
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
`