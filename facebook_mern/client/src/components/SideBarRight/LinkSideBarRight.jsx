import React from "react";
import { Link } from "react-router-dom";
import classes from "./LinkSideBarRight.module.css";
const LinkSideBarRight = (props) => {
  return (
    <Link to={`/profile/${props.userId}`} className={`${classes.container}`}>
      <div className={classes.container__users}>
        <img
          src={
            props.picturePath
              ? `http://localhost:3001/assets/${props.picturePath}`
              : "http://localhost:3001/assets/gg.jpg"
          }
          alt=""
        />
        <p>{`${props.firstName} ${props.lastName}`}</p>
      </div>
    </Link>
  );
};

export default LinkSideBarRight;
