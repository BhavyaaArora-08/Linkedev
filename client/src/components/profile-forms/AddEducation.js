import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addEducation } from "../../redux/actions/profile";
import { connect } from "react-redux";

const AddEducation = (props) => {
  const [formdata, updateFormdata] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: null,
    current: false,
    description: "",
  });

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  } = formdata;

  const onChange = (e) => {
    updateFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.addEducation(formdata);
  };

  return (
    <div>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            onChange={onChange}
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
          />
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
          />
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            type="text"
            placeholder="Field Of Study"
            name="fieldOfStudy"
            value={fieldOfStudy}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input onChange={onChange} value={from} type="date" name="from" />
        </div>
        <div className="form-group">
          <p>
            <input
              onChange={onChange}
              type="checkbox"
              name="current"
              value={current}
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input onChange={onChange} value={to} type="date" name="to" />
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={onChange}
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
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

export default connect(null, { addEducation })(AddEducation);
