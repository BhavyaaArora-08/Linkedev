import axios from "axios";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";
import {
  PROFILE_LOADED,
  CREATE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/profile/me", formData, config);
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(
      setAlert(
        "success",
        edit
          ? "Profile has been updated successfully"
          : "Profile created successfully"
      )
    );

    // in actions we can redirect only with the history object passed by the component
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        console.log(error);
        dispatch(setAlert("danger", error.msg, uuidv4()));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addEducation = (token, body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "apllication/json",
      "x-auth-token": token,
    },
  };

  try {
    const res = await axios.put("/api/profile/experience", body, config);
    console.log(res.data);
  } catch (err) {
    if (err) {
      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((error) => {
          console.log(error);
          dispatch(setAlert("danger", error.msg, uuidv4()));
        });
      }
    } else {
      dispatch(setAlert("danger", "Server Error", uuidv4()));
    }
  }
};
