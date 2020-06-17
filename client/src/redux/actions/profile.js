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
    console.log(formData);
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

export const addExperience = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put("/api/profile/experience", body, config);
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert("success", "Experience Added"));
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

export const addEducation = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put("/api/profile/education", body, config);
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert("success", "Education Added", uuidv4()));
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

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert("danger", "Education Deleted", uuidv4()));
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

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert("danger", "Experience Deleted", uuidv4()));
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

// Delete Account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile/me");
      dispatch({ type: "CLEAR_PROFILE" });
      dispatch({ type: "ACCOUNT_DELETED" });
      dispatch(
        setAlert("", "Your account has been permanently deleted", uuidv4())
      );
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
  }
};
