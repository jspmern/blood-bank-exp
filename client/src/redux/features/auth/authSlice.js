import { createSlice } from "@reduxjs/toolkit";
let intialValue = {
    loading: false,
    user: null,
    token: null,
    error: null
}
const authSlice = createSlice({
    name: "auth",
    initialState: intialValue,
    reducers: {},

})
export default authSlice