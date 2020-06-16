import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addExperience } from "../../redux/actions/profile";
import { connect } from "react-redux";

const AddExperience = (props) => {
  const [formdata, updateFormdata] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: null,
    current: false,
    description: "",
  });

  const { title, company, location, from, to, current, description } = formdata;

  const onChange = (e) => {
    updateFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.addExperience(formdata);
  };
  return (
    <div>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            onChange={onChange}
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
          />
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
          />
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            type="text"
            placeholder="Location"
            name="location"
            value={location}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input onChange={onChange} type="date" name="from" value={from} />
        </div>
        <div className="form-group">
          <p>
            <input
              onChange={onChange}
              type="checkbox"
              name="current"
              value={current}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input onChange={onChange} type="date" name="to" value={to} />
        </div>
        <div className="form-group">
          <textarea
            onChange={onChange}
            value={description}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default connect(null, { addExperience })(AddExperience);
