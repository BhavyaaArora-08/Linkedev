import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, avatar, name },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div class="profile bg-light">
      <img class="round-img" src={avatar} alt="" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company} </span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i class="fas fa-check"></i>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
