import { createSlice } from "@reduxjs/toolkit";

type UserType = {
    CurrentUser: {
        jwt: string,
        user: {
            id?: string,
            role_id?: number,
            money?: string,
            email?: string,
            name?:string
        }
    },
    isFetching: boolean,
    isError: boolean,
    isRemember: boolean
}

const UserInitialState: UserType = {
    CurrentUser: {
        jwt: "",
        user: {},
    },
    isFetching: false,
    isError: false,
    isRemember: false
}


const AuthSlice = createSlice({
    name: "auth",
    initialState: UserInitialState,
    reducers: {
        userLoginStart: (state) => {
            state.isFetching = true,
            state.isError = false
        },
        userLoginSuccess: (state, actions) => {
            state.isFetching = false,
            state.CurrentUser = actions.payload,
            state.isError = false
        },
        userLoginError: (state) => {
            state.isFetching = false,
            state.isError = true
        },
        userLogoutSuccess: (state) => {
            state.isError = false,
            state.CurrentUser = UserInitialState.CurrentUser,
            state.isFetching = false
        },
        userRegisterStart: (state) => {
            state.isFetching = true
            state.isError = false
        },
        userRegisterSuccess: (state) => {
            state.isFetching = false,
            state.isError = false
        },
        userRegisterFailed: (state) => {
            state.isFetching = false,
            state.isError = true
        },
        userRememberLogin: (state, action) => {
            state.isRemember = action.payload
        },
        userChangeInfo: (state, actions) => {
            state.isFetching = false,
            state.CurrentUser.user = actions.payload,
            state.isError = false
        },
    }
})

export const {
    userLoginStart,
    userLoginSuccess,
    userLoginError,
    userLogoutSuccess,
    userRegisterStart,
    userRegisterSuccess,
    userRegisterFailed,
    userRememberLogin,
    userChangeInfo
} = AuthSlice.actions

export default AuthSlice.reducer