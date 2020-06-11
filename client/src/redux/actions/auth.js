import axios from "axios";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

// To interact with database and backend api and also manage react states we will make use of action generators

// // LOAD_USER
// export const loadUser = async () => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get("/api/");
//   } catch {}
// };

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
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    const res = await axios.post("/api/users/login", body, config);
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
  }
};
