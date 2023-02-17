import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../state";
import classes from "./NavBar.module.css";
const NavBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    dispatch(setLogout());
  };
  const getValueSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };
  const handleSearch = (e) => {
    console.log(search);
    navigate(`/posts?description=${search}`);
  };
  // useEffect(() => {
  //   const handleClick = (e) => {
  //     if (e.keyCode === 13) {
  //       console.log(e.keyCode);
  //       console.log(search);
  //       navigate(`/posts?description=${search}`);
  //     }
  //   };
  //   window.addEventListener("keyup", handleClick);
  //   // return window.removeEventListener("keyup", handleClick);
  // }, [search]);
  return (
    <div className={classes.container}>
      <div className={classes.container__search}>
        <Link className={classes.linkLogo} to="/home">
          <img
            className={classes.logoPage}
            width={40}
            height={40}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
            alt=""
          />
        </Link>
        <div>
          <i
            onClick={handleSearch}
            className="fa-solid fa-magnifying-glass"
          ></i>
          <input
            onChange={getValueSearch}
            value={search}
            type="text"
            placeholder="Tìm kiếm trên Facebook"
          />
        </div>
      </div>
      <div className={classes.container__navbar}>
        <button>
          <img src="./../../icons/home.png" alt="" />
        </button>
        <button>
          <img src="./../../icons/page.png" alt="" />
        </button>
        <button>
          <img src="./../../icons/stream.png" alt="" />
        </button>
        <button>
          <img src="./../../icons/group.png" alt="" />
        </button>
        <button>
          <img src="./../../icons/meta.png" alt="" />
        </button>
      </div>
      <div className={classes.container__actions}>
        <button>
          <i className="fa-brands fa-slack"></i>
        </button>
        <button>
          <i className="fa-brands fa-facebook-messenger"></i>
        </button>
        <button>
          <i className="fa-solid fa-bell"></i>
        </button>
        <div>
          <img
            src={`http://localhost:3001/assets/${user.picturePath}`}
            alt=""
          />
          <button className={classes.liveAccount}></button>

          <button onClick={handleLogOut} className={classes.logOutAccount}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
