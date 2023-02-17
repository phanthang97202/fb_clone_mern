import React from "react";
import classes from "./OptionsMenu.module.css";

const OptionMenu = () => {
  return (
    <div className={classes.container}>
      <ul>
        <li>
          <img src={`./../../icons/edit_option.png`} alt="" />
          <p>Chỉnh sửa bài viết</p>
        </li>
      </ul>
    </div>
  );
};

export default OptionMenu;
