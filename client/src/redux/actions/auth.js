import axios from "axios";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// REGISTER_USER
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);
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
