export const ADD=(item,attribute)=>{
    return{
        type: "ADD_CART",
        payload:item,
        attributePayload:attribute
    }
}
export const DLT=(id)=>{
    return{
        type: "DLT_CART",
        payload:id
    }
}
export const DLTONE=(id)=>{
    return{
        type: "DLT_ONE",
        payload:id
    }
}


export const REMOVE = (iteam) => {
    return {
        type: "RMV_ONE",
        payload: iteam
    }
}

export const CHANGE =(index)=>{
    return{
        type: "Change_Currency",
        payload: index
    }
}

export const CHANGECATEGORY=(nameId)=>{
    return{
        type: "CHANGE_CATEGORY",
        payload:nameId
    }
}