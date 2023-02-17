import axios from "axios";
import React, { useState } from "react";
import classes from "./index.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import Introduce from "./Introduce";
import UserPosts from "./UserPosts";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const param = useParams();
  // console.log("===param", param);

  const token = useSelector((state) => state.auth.token);
  // console.log("===token", token);
  useEffect(() => {
    const handleProfile = async (e) => {
      const user = await axios({
        method: "get",
        url: `http://localhost:3001/users/${param.userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProfile(user.data.data);
    };
    handleProfile();
  }, []);
  console.log("===profile", profile);

  return (
    <div>
      <NavBar />
      {profile && (
        <>
          <div className={classes.container}>
            <div className={classes.profile__coverImage}>
              <div className={classes.profile__image}>
                <img
                  src={`http://localhost:3001/assets/${profile.picturePath}`}
                  alt=""
                />
                <button>
                  <i className="fa-solid fa-camera"></i>Chỉnh sửa ảnh bìa
                </button>
              </div>
              <div className={classes.profile__infor}>
                <div className={classes.profile__box_left}>
                  <div className={classes.profile__infor_avatar}>
                    <img
                      src={`http://localhost:3001/assets/${profile.picturePath}`}
                      alt=""
                    />
                  </div>
                  <div className={classes.profile__infor_friend}>
                    <h2>{`${profile.firstName} ${profile.lastName} `}</h2>
                    <h4>144 bạn bè</h4>
                    <ul>
                      <li>
                        <img
                          src={`http://localhost:3001/assets/friend.jpg`}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src={`http://localhost:3001/assets/friend2.jpg`}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src={`http://localhost:3001/assets/friend.jpg`}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src={`http://localhost:3001/assets/friend2.jpg`}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src={`http://localhost:3001/assets/friend.jpg`}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src={`http://localhost:3001/assets/friend2.jpg`}
                          alt=""
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={classes.profile__actions}>
                  <button className={classes.profile__actions_add}>
                    <i className="fa-solid fa-plus"></i>Thêm vào tin
                  </button>
                  <button className={classes.profile__actions_edit}>
                    <i className="fa-solid fa-pen"></i>Chỉnh sửa trang cá nhân
                  </button>
                </div>
              </div>
              <div className={classes.profile__navbar}>
                <div className={classes.profile__navbar_left}>
                  <Link className={classes.link__navbar} to="#">
                    Bài viết
                  </Link>

                  <Link className={classes.link__navbar} to="#">
                    Giới thiệu
                  </Link>

                  <Link className={classes.link__navbar} to="#">
                    Bạn bè
                  </Link>

                  <Link className={classes.link__navbar} to="#">
                    Ảnh
                  </Link>

                  <Link className={classes.link__navbar} to="#">
                    Video
                  </Link>

                  <Link className={classes.link__navbar} to="#">
                    Check in
                  </Link>

                  <Link className={classes.link__navbar} to="#">
                    Xem thêm
                  </Link>
                </div>
                <div className={classes.profile__navbar_right}>
                  <button>
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className={classes.profile__content}>
              <div className={classes.profile__introduce}>
                <Introduce
                  work={profile.occupation}
                  live={profile.location}
                ></Introduce>
              </div>
              <div className={classes.profile__userposts}>
                <UserPosts userId={param.userId}></UserPosts>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
