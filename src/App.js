import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';

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

function App() {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);
  console.log(data )
  if (loading) return "Loading...";
  return (
    <Home data={data}/>
  );
}

export default App;
