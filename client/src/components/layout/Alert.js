import React, { Fragment } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";

const Alert = ({ alerts }) =>
  alerts != null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps)(Alert);

// export default Alert;
