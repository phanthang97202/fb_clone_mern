import React from "react";
import { Link } from "react-router-dom";
import classes from "./LinkSideBarLeft.module.css";
// const LinkSideBarLeft = (props) => {
//   return (
//     <div
//       className={`${classes.items} ${props.className ? props.className : ""}`}
//     >
//       <i className={`fa-solid ${props.icon}`}></i>
//       <p>{props.title}</p>
//     </div>
//   );
// };
const LinkSideBarLeft = (props) => {
  return (
    <>
      <Link
        to="/profile/fdsf"
        className={`${classes.items} ${props.className ? props.className : ""}`}
      >
        <img src={`./../../icons/${props.icon}.png`} alt="" />
        <p>{props.title}</p>
      </Link>
    </>
  );
};

export default LinkSideBarLeft;
