import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer} from '../reducers/productListReducer'
import { cartReducer } from '../reducers/cartReducer'
import { userReducer, userRegisterReducer, userDetailReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from '../reducers/userReducer'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer } from '../reducers/orderReducer'

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetailsReducer:orderDetailsReducer,
    orderListMy:orderListMyReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    orderList:orderListReducer,
    orderDeliver : orderDeliverReducer

})

const cartItemsFromStorage = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
:[]

const userInfoFromStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
:null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
? JSON.parse(localStorage.getItem("shippingAddress"))
:{}

const initialState={
    cart:{cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage,
    },
    userLogin:{userInfo:userInfoFromStorage},
    userDetails:{user:userInfoFromStorage},
    userUpdateProfile:{success:userInfoFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;