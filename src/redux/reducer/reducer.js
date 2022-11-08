
const INIT_STATE = {
    carts: [],
    priceIndex:0,
    total:0,
    category:"all"
};



export const cartreducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_CART":

        const IteamIndex = state.carts.findIndex((iteam)=> iteam.id === action.payload.id);
        const temp = {...action.payload,qnty:1,attribute:action.attributePayload};
            console.log(action.attributePayload);
            console.log(temp.attribute);
           
        if(IteamIndex >= 0){
            console.log( state.carts[IteamIndex]);
                state.carts[IteamIndex].qnty +=1
            return {
                ...state,
                carts:[...state.carts]
            
            }
        }else{
            
            if(action.attributePayload===temp.attribute)
                    {
                        return {
                            ...state,
                            carts: [...state.carts,temp]
                        }
                    }
            else{
                return {
                    ...state,
                    carts: [...state.carts]
                }
            } 
        }

        case "DLT_ONE":
            const data = state.carts.filter((el)=>el.id !== action.payload);

            return {
                ...state,
                carts:data
            }

        case "DLT_CART":
            const emptyData =[]; 
            // console.log(data);

            return {
                ...state,
                carts:emptyData
            }

        case "CHANGE_CATEGORY":
            return{
                ...state,
                category:action.payload
            }
        case "RMV_ONE":
            const ItemIndex_dec = state.carts.findIndex((iteam)=> iteam.id === action.payload.id);
   
            if(state.carts[ItemIndex_dec].qnty >= 1){
                const dltitems = state.carts[ItemIndex_dec].qnty -= 1
                
                // console.log("redux",[...state.carts,dltiteams]);

                return {
                    ...state,
                    carts:[...state.carts]
                }
            }
            else if(state.carts[ItemIndex_dec].qnty===1){
                const data = state.carts.filter((el)=>el.id !== action.payload);

                return {
                    ...state,
                    carts:data
                }
            }

        case "Change_Currency":
            const newIndex=action.payload;
            return{
                ...state,
                priceIndex:newIndex
            }

        
              
        default:
            return state
            
    }
}