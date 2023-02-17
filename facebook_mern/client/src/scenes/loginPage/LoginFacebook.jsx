// import { createBrowserHistory } from "@remix-run/router";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import classes from "./LoginFacebook.module.css";
const LoginFacebook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await axios({
      method: "post",
      url: "https://fb-clone-mern.onrender.com/auth",
      headers: {
        Authorization: "Bearer null",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email,
        password,
      }),
    });
    console.log("===user", user);
    if (user) {
      dispatch(
        setLogin({
          user: user.data.data.user,
          token: user.data.data.token,
        })
      );
      // const history = createBrowserHistory();
      // console.log("===history", history, history.location.pathname);
      // history.push({
      //   pathname: '/home'
      // })
      // window.location.href("/home");
      navigate("/home");
    }
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.login}>
          <div className={classes.login__info}>
            <img src={`./../../icons/logo.svg`} alt="" />
            <p>
              Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
              của bạn.
            </p>
          </div>
          <div className={classes.login_form}>
            <form action="">
              <input
                value={email}
                onChange={handleEmail}
                type="text"
                placeholder="Email hoặc số điện thoại"
              />
              <input
                value={password}
                onChange={handlePassword}
                type="password"
                placeholder="Mật khẩu"
              />
              <button onClick={handleLogin} type="submit">
                Đăng nhập
              </button>
              <a href="#">Quên mật khẩu</a>
              <hr />
              <button className={classes.createNewAcc}>
                Tạo tài khoản mới
              </button>
            </form>
            <p>
              Tạo trang dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginFacebook;
