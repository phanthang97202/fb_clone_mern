import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isOpenUpdate, isUpdateSuccess } from "../../state/form";
import classes from "./UpdateForm.module.css";

const UpdateForm = (props) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // update bài viết
  const [currentPostUpdate, setCurrentPostUpdate] = useState({});
  const [descriptionUpdate, setDescriptionUpdate] = useState(
    currentPostUpdate.description
  );

  useEffect(() => {
    const handleGetCurrentPost = async (e) => {
      const getDataCurrentPost = await axios({
        method: "get",
        url: `https://fb-clone-mern.onrender.com//posts/${props.idPostUpdate}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("===data post update", getDataCurrentPost);
      setCurrentPostUpdate(getDataCurrentPost.data.data);
    };
    handleGetCurrentPost();
  }, []);

  console.log("====props.updatePost", props.updatePost);

  const [fileUpdate, setFileUpdate] = useState(null);

  // preview file upload
  const [previewImageUpdate, setPreviewImageUpdate] = useState();
  const dispatchOpenUpdate = useDispatch();
  const handleCloseFormUpdate = (e) => {
    e.preventDefault();
    dispatchOpenUpdate(
      isOpenUpdate({
        isOpenForm: false,
      })
    );
  };
  const handleSetDescriptionUpdate = (e) => {
    setDescriptionUpdate(e.target.value);
    // setDescriptionUpdate(`${props.updatePost}`);
  };

  // clean up file memory
  useEffect(() => {
    return () => {
      previewImageUpdate && URL.revokeObjectURL(previewImageUpdate.preview);
    };
  }, [previewImageUpdate]);
  const handlePictureUpdate = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setPreviewImageUpdate(file);
    setFileUpdate(e.target.files[0]);
  };

  const dispatchUpdateSuccess = useDispatch();
  const handleUpdatePost = async (e) => {
    const data = new FormData();
    data.append("description", descriptionUpdate);
    data.append("userPicturePath", fileUpdate);

    e.preventDefault();
    const postUp = await axios({
      method: "patch",
      url: `https://fb-clone-mern.onrender.com/posts/${props.idPostUpdate}/updatePost/${user._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
    console.log("==postUp", postUp);
    dispatchOpenUpdate(
      isOpenUpdate({
        isOpenForm: false,
      })
    );
    dispatchUpdateSuccess(
      isUpdateSuccess({
        isSuccess: true,
      })
    );
    // setFileUpdate(null);
  };
  useEffect(() => {
    dispatchUpdateSuccess(
      isUpdateSuccess({
        isSuccess: false,
      })
    );
  }, []);

  return (
    <>
      {props.updatePost && (
        <div className={classes.container}>
          <div className={classes.form}>
            <div className={classes.container__title}>
              <p>Chỉnh sửa bài viết</p>
              <button
                onClick={handleCloseFormUpdate}
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
                  name="description"
                  id=""
                  cols="30"
                  rows="4"
                  // placeholder={`${user.firstName} ${user.lastName}, bạn đang nghĩ gì thế?`}
                  // value={props.updatePost}
                  value={descriptionUpdate}
                  // value={currentPostUpdate.description}
                  onChange={handleSetDescriptionUpdate}
                >
                  {/* {currentPostUpdate.description} */}
                </textarea>
                {/* {currentPostUpdate && <p>{currentPostUpdate.description}</p>} */}
                <button>
                  <i className="fa-regular fa-face-smile"></i>
                </button>
              </div>
              <div className={classes.container__upload}>
                <div>
                  <input
                    // ref={fileRef}
                    onChange={handlePictureUpdate}
                    // value={userPicturePath}
                    type="file"
                    name="userPicturePath"
                  />
                  <button className={classes.closeupload}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                {previewImageUpdate && (
                  <img
                    className={classes.previewFileUpload}
                    src={previewImageUpdate.preview}
                    alt=""
                    width={100}
                    height={100}
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
              <button
                onClick={handleUpdatePost}
                className={classes.submitUpload}
              >
                Chỉnh sửa
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateForm;
