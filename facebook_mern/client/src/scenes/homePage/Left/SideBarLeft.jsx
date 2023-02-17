import React from "react";
import classes from "./SideBarLeft.module.css";
import { useSelector } from "react-redux";
import LinkSideBarLeft from "../../../components/SideBarLeft/LinkSideBarLeft";
import { Link } from "react-router-dom";
import LinkBarLeftRef from "../../../components/SideBarLeft/LinkBarLeftRef";

const SideBarLeft = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={classes.container}>
      <Link to={`/profile/${user._id}`} className={classes.avatar}>
        <img src={`http://localhost:3001/assets/${user.picturePath}`} alt="" />
        <p>{`${user.firstName} ${user.lastName}`}</p>
      </Link>
      <LinkSideBarLeft icon="heart" title="Hẹn hò" />
      <LinkSideBarLeft icon="pageaside" title="Trang" />
      <LinkSideBarLeft icon="groupaside" title="Nhóm" />
      <LinkSideBarLeft icon="gameaside" title="Chơi game" />
      <LinkSideBarLeft icon="metaaside" title="Meta Facebook" />
      <div className={classes.viewmore}>
        <button>
          <i className="fa-solid fa-chevron-down"></i>
        </button>
        <p> Xem thêm</p>
      </div>
      <LinkBarLeftRef />
      <div className={classes.viewmore}>
        <button>
          <i className="fa-solid fa-chevron-down"></i>
        </button>
        <p> Xem thêm</p>
      </div>
      <div className={classes.policy}>
        <a href="#">Quyền riêng tư</a>-<a href="#">Điều khoản</a>-
        <a href="#">Quảng cáo</a>-<a href="#">Lựa chọn quảng cáo</a>-
        <a href="#">Xem thêm</a>-<a href="#">Meta</a>-
      </div>
    </div>
  );
};

export default SideBarLeft;
