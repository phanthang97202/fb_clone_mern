import React from "react";
import classes from "./ShortNewsItem.module.css";
const ShortNewsItem = (props) => {
  return (
    <div className={classes.container}>
      <img src={props.imagePath} alt="" />
      <div>
        <img src={props.avatar} alt="" />
      </div>
      <p>{props.name}</p>
    </div>
  );
};

export default ShortNewsItem;
