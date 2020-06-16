import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../redux/actions/profile";
import { Redirect, Link, withRouter } from "react-router-dom";

const EditProfile = ({
  profile: { userProfile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    githubusername: "",
    skills: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !userProfile.company ? " " : userProfile.company,
      website: loading || !userProfile.website ? "" : userProfile.website,
      status: loading || !userProfile.status ? "" : userProfile.status,
      location: loading || !userProfile.location ? "" : userProfile.location,
      skills:
        loading || !userProfile.skills ? "" : userProfile.skills.join(","),
      githubusername:
        loading || !userProfile.githubusername
          ? ""
          : userProfile.githubusername,
      bio: loading || !userProfile.bio ? "" : userProfile.bio,
      twitter: loading || !userProfile.social ? "" : userProfile.social.twitter,
      facebook:
        loading || !userProfile.social ? "" : userProfile.social.facebook,
      linkedin:
        loading || !userProfile.social ? "" : userProfile.social.linkedin,
      youtube: loading || !userProfile.social ? "" : userProfile.social.youtube,
      instagram:
        loading || !userProfile.social ? "" : userProfile.social.instagram,
    });
  }, []);

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select onChange={onChange} value={status} name="status">
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            value={company}
            type="text"
            placeholder="Company"
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            value={website}
            type="text"
            placeholder="Website"
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            value={location}
            type="text"
            placeholder="Location"
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            value={skills}
            type="text"
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            value={githubusername}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            value={bio}
            onChange={onChange}
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                onChange={onChange}
                value={twitter}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                onChange={onChange}
                value={facebook}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                onChange={onChange}
                value={youtube}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                onChange={onChange}
                value={linkedin}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                onChange={onChange}
                value={instagram}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
