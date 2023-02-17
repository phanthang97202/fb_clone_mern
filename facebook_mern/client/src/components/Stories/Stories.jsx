import React from "react";
import { Link } from "react-router-dom";
import classes from "./Stories.module.css";
const Stories = (props) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/stories/${props.id}`}>
      <li
        style={{ backgroundColor: props.backgroundColor }}
        className={classes.stories__menu_user_item}
      >
        <div>
          <img src={props.imagePath} alt="" />
        </div>
        <div>
          <p>{props.name}</p>
          <small>{props.timeCreate}</small>
        </div>
      </li>
    </Link>
  );
};

export default Stories;
