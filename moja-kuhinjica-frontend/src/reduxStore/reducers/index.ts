import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { restaurantReducer } from './restaurantReducer'

const reducers = combineReducers({
    auth: userReducer,
    restaurant: restaurantReducer,
})

export default reducers
