import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/auth";

const Navbar = (props) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>
          {"    "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a
          onClick={() => {
            props.logoutUser(props.token, props.id);
          }}
          href="#!"
        >
          <i className="fas fa-sign-out-alt"></i>
          {"  "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        {!props.loading && (
          <Fragment>
            {" "}
            {props.isAuthenticated ? authLinks : guestLinks}{" "}
          </Fragment>
        )}
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  if (!state.auth.user) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      loading: state.auth.loading,
    };
  } else {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      loading: state.auth.loading,
      id: state.auth.user._id,
      token: state.auth.token,
    };
  }
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
