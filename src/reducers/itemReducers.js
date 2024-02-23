export const getAllitemsReducer=(state={items : []}, action) => {


    switch (action.type) 
    {
        case 'GET_itemS_REQUEST' : return {

            loading : true,
            ...state
        }
        case 'GET_itemS_SUCCESS' : return {

            loading : false,
            items : action.payload
        }
        case 'GET_itemS_FAILED' : return {

            error : action.payload,
            loading : false
        }

        default : return state
        
    }
}