import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../redux/actions/profile";
import ProfileItem from "./Profile-item";
import Spinner from "../layout/spinner";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Devlopers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>
            Browse and connect with devlopers
          </p>
          <div className="profiles">
            {profiles && profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles to display</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
