import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./API";
import { toast } from "react-toastify";
export let userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      let { data } = await API.post("/auth/v1/login", {
        email,
        password,
        role,
      });
      //store token
      if (data.success) {
        //alert(data.message);
        toast.success(data.message);
        localStorage.setItem("blood_token", data.token);
        // window.location.replace("/");
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.success(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        toast.success(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);
