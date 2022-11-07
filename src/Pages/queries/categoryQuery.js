export const CATEGORY_QUERY= `       
query getcategory($title: String!){
category(input: {title: $title}){
name,
products{
id,
name,
inStock,
description,
category,
brand,
gallery,
attributes{
id,
name,
type,
items{
displayValue,
value,
id
}
},
prices{
currency{
label,
symbol
},
amount
}
}
}
}
`