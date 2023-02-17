import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoad, isOpen } from "../../state/form";
import classes from "./FormDataPost.module.css";

const FormDataPost = (props) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState();
  const fileRef = useRef();
  const dispatchPost = useDispatch();

  // post news
  const [description, setDescription] = useState("");
  const [userPicturePath, setUserPicturePath] = useState(null);

  useEffect(() => {
    return () => {
      previewImage && URL.revokeObjectURL(previewImage.preview);
    };
  }, [previewImage]);
  const handleGetPicture = (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    setUserPicturePath(e.target.files[0]);
    console.log(userPicturePath);
    file.preview = URL.createObjectURL(file);
    setPreviewImage(file);
  };

  const handleGetValueDataInput = (e) => {
    setDescription(e.target.value);
  };

  const handlePost = (e) => {
    e.preventDefault();
    const postNewsData = async () => {
      const data = new FormData();
      data.append("userId", user._id);
      data.append("description", description);
      // data.append("userPicturePath", "gg.jpg");
      data.append("userPicturePath", userPicturePath || "test.jpg");

      const dataFinish = await axios({
        method: "post",
        url: "https://fb-clone-mern.onrender.com/posts",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
        data,
      });
      console.log("===data posts", dataFinish);
      dispatch(isOpen({ opening: false }));
      dispatchPost(isLoad({ isLoading: true }));
    };
    postNewsData();
  };

  // const submitPost = (e) => {
  //
  // }

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <div className={classes.container__title}>
          <p>Tạo bài viết</p>
          <button
            onClick={() => dispatch(isOpen({ opening: false }))}
            className={classes.closeform}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <hr />
        <form action="" encType="multipart/form-data">
          <div className={classes.container__user}>
            <img
              src={`https://fb-clone-mern.onrender.com/assets/${user.picturePath}`}
              alt=""
            />
            <div>
              <p>{`${user.firstName} ${user.lastName}`}</p>
              <select id="secret">
                <option value="onlyme">Chỉ mình tôi</option>
                <option value="public">Công khai</option>
              </select>
            </div>
          </div>
          <div className={classes.container__content}>
            <textarea
              onChange={handleGetValueDataInput}
              name="description"
              id=""
              cols="30"
              rows="4"
              placeholder={`${user.firstName} ${user.lastName}, bạn đang nghĩ gì thế?`}
            ></textarea>
            <button>
              <i className="fa-regular fa-face-smile"></i>
            </button>
          </div>
          <div className={classes.container__upload}>
            <div>
              <input
                ref={fileRef}
                onChange={handleGetPicture}
                // value={userPicturePath}
                type="file"
                name="userPicturePath"
              />

              <button className={classes.closeupload}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            {previewImage && (
              <img
                className={classes.previewUploadFile}
                src={previewImage.preview}
                alt=""
              />
            )}
          </div>
          <div className={classes.upload_from_phone}>
            <button>
              <i className="fa-solid fa-mobile-screen-button"></i>
            </button>
            <p>Thêm ảnh từ thiết bị di động</p>
            <button>Thêm</button>
          </div>
          <div className={classes.form_others}>
            <p>Thêm vào bài viết của bạn</p>
            <ul>
              <li>
                <img src={`./../../icons/photoform.png`} alt="" />
              </li>
              <li>
                <img src={`./../../icons/reactionform.png`} alt="" />
              </li>
              <li>
                <img src={`./../../icons/location_others.png`} alt="" />
              </li>
              <li>
                <img src={`./../../icons/user_other.png`} alt="" />
              </li>
              <li>
                <img src={`./../../icons/flag_other.png`} alt="" />
              </li>
              <li>
                <img src={`./../../icons/more_other.png`} alt="" />
              </li>
            </ul>
          </div>

          {description ? (
            <button
              // style={
              //   description
              //     ? { backgroundColor: "#1b74e4" }
              //     : { backgroundColor: "#e4e6eb" }
              // }
              onClick={handlePost}
              className={classes.submitUpload}
            >
              Đăng
            </button>
          ) : (
            <button
              style={{ backgroundColor: "#e4e6eb" }}
              disabled
              className={classes.submitUpload}
            >
              Đăng
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormDataPost;
