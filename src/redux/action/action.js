export const ADD=(item)=>{
    return{
        type: "ADD_CART",
        payload:item
    }
}
export const DLT=(id)=>{
    return{
        type: "DLT_CART",
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