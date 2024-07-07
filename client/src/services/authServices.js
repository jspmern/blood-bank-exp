import { toast } from "react-toastify";
import store from "../redux/store.js";
import { userLogin } from "./authAction.js";
//this is for the handling login

export let handleLoginController = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!email || !password || !role) return alert("All fields are required *");
    //api -call
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};
//handling for registration
export let handleRegistrationController = (
  e,
  email,
  password,
  name,
  role,
  phone,
  address,
  hospitalName,
  originazation
) => {
  e.preventDefault();
  try {
    console.log(email, password, role);
  } catch (error) {
    console.log(error);
  }
};
