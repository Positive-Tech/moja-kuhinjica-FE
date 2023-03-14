import UserService, { ILoggedInUser } from '@/service/User.service'
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../constants/actionTypes'

interface UserState {
    user: ILoggedInUser | null
    inProgress: boolean
    isAuthorized: boolean
    errorMessage: string | null | undefined
}

const initialState: UserState = {
    user: {
        id: '',
        name: '',
        surname: '',
        phoneNumber: '',
        role: '',
    },
    inProgress: false,
    isAuthorized: false,
    errorMessage: null,
}

export const userLogout = createAction(ActionTypes.USER_LOGOUT)
export const userLogin = createAsyncThunk(
    ActionTypes.USER_LOGIN,
    async ({ inputData, onSuccess, onError }: any) => {
        try {
            const { access_token } = await UserService.login(inputData)
            localStorage.setItem('token', access_token)
            onSuccess()
        } catch (err) {
            console.log(err)
            onError(err.response.data.message)
        }
    }
)
export const loadUser = createAsyncThunk(ActionTypes.LOAD_USER, async () => {
    const data = await UserService.getLoggedInUser()
    return data
})

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(userLogout, (state) => {
            localStorage.removeItem('token')
            state.user = null
            state.isAuthorized = false
            state.errorMessage = null
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isAuthorized = true
            state.inProgress = false
            state.errorMessage = null
        })
        .addCase(userLogin.rejected, (state, action) => {
            state.inProgress = false
            state.errorMessage = action.error.message
        })
        .addCase(userLogin.pending, (state) => {
            state.inProgress = true
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
})
