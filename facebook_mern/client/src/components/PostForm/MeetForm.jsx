import React from "react";
import classes from "./MeetForm.module.css";
const MeetForm = () => {
  return (
    <div className={classes.container}>
      <button>
        <img src={`./../../icons/meeting.png`} alt="" />
        Tạo phòng họp mặt
      </button>
    </div>
  );
};

export default MeetForm;
