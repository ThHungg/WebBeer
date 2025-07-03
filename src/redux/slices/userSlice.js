import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: "",
    phone: "",
    email: "",
    role: "khachhang",
    access_token: "",
    id: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = "", phone = "", email = "", role = "khachhang", access_token = "", id = "" } = action.payload
            state.name = name;
            state.phone = phone;
            state.email = email;
            state.access_token = access_token;
            state.id = id;
            state.role = role
        },
        resetUser: (state) => {
            state.name = ""
            state.phone = ""
            state.email = ""
            state.access_token = ""
            state.id = ""
            state.role = ""
        }
    }
})

export const { updateUser, resetUser } = userSlice.actions
export default userSlice.reducer