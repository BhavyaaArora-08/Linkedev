import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logoutUser } from "../../redux/actions/auth";
import Spinner from "../layout/spinner";
import { createProfile, getCurrentProfile } from "../../redux/actions/profile";
import DashboardActions from "./DashboardActions";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { userProfile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && userProfile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {userProfile !== null ? (
        <Fragment>
          has
          <br></br>
          <DashboardActions />
        </Fragment>
      ) : (
        <Fragment>
          You have not yet set up a profile, please add some info
          <br></br>
          <Link className="btn btn-primary my-1" to="/createProfile">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { logoutUser, getCurrentProfile })(
  Dashboard
);

/**
 * return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome name
      </p>
      <div className="dash-buttons">
        <Link to="!#" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/addExperience" className="btn btn-light">
          <i className="fab fa-black-tie text-primary"></i> Add Experience
        </Link>
        <Link to="/addEducation" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Add Education
        </Link>
      </div>

      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tech Guy Web Solutions</td>
            <td className="hide-sm">Senior Developer</td>
            <td className="hide-sm">02-03-2009 - 01-02-2014</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Traversy Media</td>
            <td className="hide-sm">Instructor & Developer</td>
            <td className="hide-sm">02-03-2015 - Now</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Northern Essex</td>
            <td className="hide-sm">Associates</td>
            <td className="hide-sm">02-03-2007 - 01-02-2009</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="my-2">
        <button className="btn btn-danger">
          <i className="fas fa-user-minus"> </i>
          Delete My Account
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            props.logoutUser(props.token, props.id);
          }}
        >
          <i className="fas fa-user-minus"> </i>
          Logout
        </button>
      </div>
    </Fragment>
  );
};

 */
// , loadProfile

// const company = props.userProfile.company
// ? props.userProfile.company
// : undefined;
// const location = props.userProfile.location
// ? props.userProfile.location
// : undefined;
// const bio = props.userProfile.bio ? props.userProfile.bio : undefined;
// const status = props.userProfile.status
// ? props.userProfile.status
// : undefined;
// const githubusername = props.userProfile.githubusername
// ? props.userProfile.githubusername
// : undefined;
// const skills = props.userProfile.skills
// ? props.userProfile.skills
// : undefined;
// const social = props.userProfile.social
// ? props.userProfile.social
// : undefined;
// const education = props.userProfile.education
// ? props.userProfile.education
// : undefined;
// const experience = props.userProfile.experience
// ? props.userProfile.experience
// : undefined;
// const user = props.userProfile.user ? props.userProfile.user : undefined;
