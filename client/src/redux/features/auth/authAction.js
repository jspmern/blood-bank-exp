import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";
//this is for the login
export let userLogin = createAsyncThunk(
    "auth/login", async ({ email, password, role }, { rejectWithValue }) => {
        try {
            let { data } = await API.post('/auth/v1/login', { email, password, role })
            if (data.success) {
                if (data.token) {
                    localStorage.setItem('blood-token', data.token)
                    toast.success(data.message)

                }
                return data

            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
                return rejectWithValue(error.response.data.message)
            }
            else {
                toast.error(error.message)
                return rejectWithValue(error.response)
            }
        }
    }
)
//this is for the registration
export let userRegister = createAsyncThunk('auth/register', async ({ email, password, name, role, phone, address, hospitalName, originazationName }, { rejectWithValue }) => {
    try {
        let { data } = await API.post('/auth/v1/register', { email, password, name, role, phone, address, hospitalName, originazationName })
        if (data.success) {
            toast.success(data.message)
        }
    }
    catch (error) {
        if (error.response && error.response.data.message) {
            toast.error(error.response.data.message)
            return rejectWithValue(error.response.data.message)
        }
        else {
            toast.error(error.message)
            return rejectWithValue(error.response)
        }
    }


})