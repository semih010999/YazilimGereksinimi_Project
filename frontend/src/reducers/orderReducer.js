import 
    {ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_RESET,
    ORDER_DELIVER_SUCCESS} 
    from '../constans/orderConstans'

export const orderCreateReducer = (state= {},action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{
                loading:true
            }
        case ORDER_CREATE_SUCCESS:
            return{
                loading:false,
                success:true,
                order:action.payload
            }
        case ORDER_CREATE_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case ORDER_CREATE_RESET:
            return{}
        default:
            return state
    }
}

export const orderDetailsReducer = (state= {loading:true,orderItems:[],shippingAddress:{}},action)=>{
    switch(action.type){
        case ORDER_DETAIL_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ORDER_DETAIL_SUCCESS:
            return{
                loading:false,
                order:action.payload
            }
        case ORDER_DETAIL_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const orderListMyReducer = (state= {orders:[]},action)=>{
    switch(action.type){
        case ORDER_LIST_MY_REQUEST:
            return{
                loading:true
            }
        case ORDER_LIST_MY_SUCCESS:
            return{
                loading:false,
                orders:action.payload
            }
        case ORDER_LIST_MY_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case ORDER_LIST_MY_RESET:
            return{
                orders:[]
            }
        default:
            return state
    }
}

export const orderListReducer = (state= {orders:[]},action)=>{
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return{
                loading:true
            }
        case ORDER_LIST_SUCCESS:
            return{
                loading:false,
                orders:action.payload
            }
        case ORDER_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const orderDeliverReducer = (state= {},action)=>{
    switch(action.type){
        case ORDER_DELIVER_REQUEST:
            return{
                loading:true
            }
        case ORDER_DELIVER_SUCCESS:
            return{
                loading:false,
                succes:true
            }
        case ORDER_DELIVER_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case ORDER_DELIVER_RESET:
            return{}
        default:
            return state
    }
}

