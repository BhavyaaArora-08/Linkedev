import axios from "axios";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

// To interact with database and backend api and also manage react states we will make use of action generators

// LOAD_USER
export const loadUser = () => async (dispatch) => {
  console.log("heyyy");
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/users");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// REGISTER_USER
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    // Interact with backend api
    const res = await axios.post("/api/users", body, config);

    // If no errors above then this will execute
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(setAlert("success", "You are registered successfully!", uuidv4()));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert("danger", error.msg, uuidv4()))
      );
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

// LOGIN_USER
export const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users/login", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(setAlert("success", "You are logged in successfully!", uuidv4()));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => {
        console.log(error);
        dispatch(setAlert("danger", error.msg, uuidv4()));
      });
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout user
export const logoutUser = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  try {
    dispatch({ type: CLEAR_PROFILE });
    await axios.post("/api/users/logout", null, config);
    dispatch({ type: LOGOUT });

    dispatch(
      setAlert("success", "You have logged out successfully!", uuidv4())
    );
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => {
        console.log(error);
        dispatch(setAlert("danger", error.msg, uuidv4()));
      });
    }
  }
};
