import { combineReducers } from 'redux'

import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllitemsReducer } from './reducers/itemReducers'
import { adminloginReducer} from './reducers/adminReducer'


const finalReducer = combineReducers({

    getAllitemsReducer: getAllitemsReducer,
    
    adminloginReducer: adminloginReducer,
    
    
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

const currentAdmin = localStorage.getItem('currentAdmin') ? JSON.parse(localStorage.getItem('currentAdmin')) : null

const currentDriver = localStorage.getItem('currentDriver') ? JSON.parse(localStorage.getItem('currentDriver')) : null

const currentNotifications = localStorage.getItem('currentNotifications') ? JSON.parse(localStorage.getItem('currentNotifications')) : null




const initialState = {
    cartReducer: {
        cartItems: cartItems
    },
    loginUserReducer: {
        currentUser: currentUser,
        currentNotifications: currentNotifications,
        
    },
    adminloginReducer: {
        currentAdmin: currentAdmin,
        currentNotifications: currentNotifications,
        
    },
    driverloginReducer: {
        currentDriver: currentDriver,
        
        
    }
   
}

const composeEnhancers = composeWithDevTools({})
const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))


export default store