import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logoutUser } from "../../redux/actions/auth";
import Spinner from "../layout/spinner";
import { createProfile, getCurrentProfile } from "../../redux/actions/profile";
import DashboardActions from "./DashboardActions";
import Profile from "./Profile";
// import { deleteAccount } from "../../redux/actions/profile";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
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
          <DashboardActions />
          <br></br>
          <Profile />
          <div className="my-2">
            {/* onClick={() => deleteAccount()} */}
            <button className="btn btn-danger">
              <i className="fas fa-user-minus"> </i>
              {"  "}Delete Account
            </button>
          </div>
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

export default connect(mapStateToProps, {
  logoutUser,
  getCurrentProfile,
})(Dashboard);

// deleteAccount,

/**
 * 
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
