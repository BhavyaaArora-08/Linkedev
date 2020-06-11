import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (alertType, msg, id) => (dispatch) => {
  const obj = {
    type: SET_ALERT,
    payload: { msg, alertType, id },
  };
  dispatch(obj);

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      alert_id: id,
    });
  }, 5000);
};
