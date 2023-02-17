import React from "react";
import { useSelector } from "react-redux";
import classes from "./ShortNewsMe.module.css";
const ShortNewsMe = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={classes.container}>
      <div className={classes.container__avatar}>
        <img src={`http://localhost:3001/assets/${user.picturePath}`} alt="" />
      </div>
      <div className={classes.container__infor}>
        <button>
          <i className="fa-solid fa-plus"></i>
        </button>
        <p>Tạo tin</p>
      </div>
    </div>
  );
};

export default ShortNewsMe;
