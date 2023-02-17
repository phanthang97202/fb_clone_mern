import React from "react";
import LinkSideBarLeft from "./LinkSideBarLeft";
import classes from "./LinkBarLeftRef.module.css";
const LinkBarLeftRef = () => {
  return (
    <div className={classes.container}>
      <p className={classes.container__title}>Lối tắt của bạn</p>
      <LinkSideBarLeft icon="j2team" title="J2Team Community" />
      <LinkSideBarLeft icon="lnd" title="Link Never Die Community" />
      <LinkSideBarLeft icon="fil" title="Fall In Luv" />
      <LinkSideBarLeft icon="rvn" title="RVN Community" />
    </div>
  );
};

export default LinkBarLeftRef;
