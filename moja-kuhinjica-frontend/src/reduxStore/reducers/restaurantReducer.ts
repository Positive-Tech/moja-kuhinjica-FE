import { ICartItem, IMeal } from '@/service/Restaurant.service'
import { createAction, createReducer, current } from '@reduxjs/toolkit'
import { ActionTypes } from '../constants/actionTypes'

interface RestaurantState {
    cartItems: ICartItem[]
}

const initialState: RestaurantState = {
    cartItems: [],
}

export const addItemToCart = createAction<ICartItem>(
    ActionTypes.ADD_ITEM_TO_CART
)
export const changeMealAmount = createAction<{ meal: IMeal; amount: number }>(
    ActionTypes.CHANGE_MEAL_AMOUNT
)
export const removeCartItem = createAction<IMeal>(ActionTypes.REMOVE_CART_ITEM)

export const restaurantReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addItemToCart, (state, action) => {
            state.cartItems = [...state.cartItems, action.payload]
        })
        .addCase(changeMealAmount, (state, action) => {
            const itemIndex = current(state).cartItems.findIndex(
                (item) => item.meal.id === action.payload.meal.id
            )
            const item = state.cartItems[itemIndex]
            item.amount += action.payload.amount
            state.cartItems[itemIndex] = item
        })
        .addCase(removeCartItem, (state, action) => {
            const itemIndex = current(state).cartItems.findIndex(
                (item) => item.meal.id === action.payload.id
            )
            state.cartItems.splice(itemIndex, 1)
        })
})
