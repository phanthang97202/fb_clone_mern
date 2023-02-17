import axios from "axios";
import classes from "./SideBarRight.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinkSideBarRight from "../../../components/SideBarRight/LinkSideBarRight";
import { setUsers } from "../../../state";

const SideBarRight = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  useEffect(() => {
    const getAllUsers = async () => {
      const users = await axios({
        method: "get",
        url: "https://fb-clone-mern.onrender.com/users",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("===users", users);
      dispatch(
        setUsers({
          users: users.data.data,
        })
      );
    };
    getAllUsers();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.container__navbar}>
        <p>Người liên hệ</p>
        <div>
          <i className="fa-solid fa-camera"></i>
          <i className="fa-solid fa-magnifying-glass"></i>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      {users.map((user, index) => (
        <LinkSideBarRight
          key={user._id}
          userId={user._id}
          firstName={user.firstName}
          lastName={user.lastName}
          picturePath={user.picturePath}
        />
      ))}
    </div>
  );
};

export default SideBarRight;
