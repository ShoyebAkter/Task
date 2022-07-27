const INITIAL_STATE = {
    carts: []
}


export const cartreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_CART":
            return {
                ...state,
                carts: [...state.carts, action.payload]
            }
        case "DLT_CART":
            const data=state.carts.filter((el)=>el.id!==action.payload)

            return {
                ...state,
                carts:data
            }    

        default:
            return state
    }
}