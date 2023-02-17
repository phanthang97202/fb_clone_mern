import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isOpen, isPost } from "../../state/form";
import FormDataPost from "./FormDataPost";
import classes from "./PostForm.module.css";
const PostForm = (props) => {
  const isForm = useSelector((state) => state.form.open);
  const dispatch = useDispatch();
  // const dispatchIsPosted = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // const isPosted = useSelector((state) => state.form.post);

  return (
    <>
      {isForm ? <FormDataPost /> : ""}
      {/* {isPosted === false && <FormDataPost />} */}
      {/* {isPosted === true ? null : <FormDataPost />} */}
      <div
        onClick={() => {
          dispatch(isOpen({ opening: true }));
          // dispatchIsPosted(isPost({ isPosted: false }));
        }}
        className={classes.container}
      >
        <div className={classes.container__user}>
          <img
            src={`https://fb-clone-mern.onrender.com/assets/${user.picturePath}`}
            alt=""
          />
          <input
            type="text"
            placeholder={`${user.firstName} ${user.lastName} ơi, bạn đang nghĩ gì vậy nhỉ?`}
          />
        </div>
        <div className={classes.container__actions}>
          <button>
            <img src={`./../../icons/streamform.png`} alt="" />
            Video trực tiếp
          </button>
          <button>
            <img src={`./../../icons/photoform.png`} alt="" />
            Ảnh/video
          </button>
          <button>
            <img src={`./../../icons/reactionform.png`} alt="" />
            Cảm xúc/Hoạt động
          </button>
        </div>
      </div>
    </>
  );
};

export default PostForm;
