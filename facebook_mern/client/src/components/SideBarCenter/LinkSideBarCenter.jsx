import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isLike, isLoad, isOpen, isOpenUpdate } from "../../state/form";
import Comments from "../PostForm/Comments";
import UpdateForm from "../UpdateForm/UpdateForm";
import classes from "./LinkSideBarCenter.module.css";

const LinkSideBarCenter = (props) => {
  const [viewComments, setViewComments] = useState([]);
  const [numberComments, setNumberComments] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const time = props.createAt;
  // console.log("===time", time);
  const format = time.split("T");
  const dayFormat = format[0];
  const timeFormat = format[1].split(".")[0];

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const hanldeDeletePost = (idUser) => {
    const deletePost = async () => {
      await axios({
        method: "delete",
        // url: `https://fb-clone-mern.onrender.com/posts/${idUser}`,
        url: `https://fb-clone-mern.onrender.com/posts/${props.id_post}/deletePost/${user._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("=====idUser delete post====", idUser);
      dispatch(isLoad({ isLoading: true }));
      // window.location.reload();
    };
    deletePost();
  };
  const handleGetAllCommentOnPost = () => {
    const getAllPosts = async () => {
      const allCommentsOnPost = await axios({
        method: "get",
        url: `https://fb-clone-mern.onrender.com/comments/${props.idUser}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(isLoad({ isLoading: true }));
      // window.location.reload();
      // console.log("===allCommentsOnPost", allCommentsOnPost);
      // console.log("===allCommentsOnPost", allCommentsOnPost.data.data);
      // console.log("===props.idUser", props.idUser);
      console.log(allCommentsOnPost.data.result);
      setViewComments(allCommentsOnPost.data.data);
      // setNumberComments(allCommentsOnPost.data.result);
    };
    getAllPosts();
  };
  const commented = useSelector((state) => state.form.comment);
  useEffect(() => {
    const getAllPosts = async () => {
      const allCommentsOnPost = await axios({
        method: "get",
        url: `https://fb-clone-mern.onrender.com/comments/${props.idUser}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(isLoad({ isLoading: true }));
      setNumberComments(allCommentsOnPost.data.result);
      // console.log("rerender");
    };
    getAllPosts();
  }, [commented]);

  let fileUpload;
  props.userPicturePath && (fileUpload = props.userPicturePath.split(".")[1]);

  // console.log("===fileUpload", fileUpload);
  const Video = () => {
    return (
      <video
        className={classes.videoUpload}
        controls
        src={`https://fb-clone-mern.onrender.com/assets/${props.userPicturePath}`}
        type="video/mp4"
      ></video>
    );
  };
  const Image = () => {
    return (
      <img
        src={`https://fb-clone-mern.onrender.com/assets/${props.userPicturePath}`}
        alt=""
      />
    );
  };
  const handleViewComment = (e) => {
    e.preventDefault();
    handleGetAllCommentOnPost();
  };

  // cập nhật bài viết của người dùng đã phân quyền
  const [currentPost, setCurrentPost] = useState({});
  const openFormUpdate = useSelector((state) => state.form.update);
  const dispatchOpenUpdate = useDispatch();
  const handleUpdateForm = async (e) => {
    e.preventDefault();
    dispatchOpenUpdate(
      isOpenUpdate({
        isOpenForm: true,
      })
    );

    // lấy ra thông tin chi tiết của bài post

    const postCurrentInfor = await axios({
      method: "get",
      url: `https://fb-clone-mern.onrender.com/posts/${props.id_post}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCurrentPost(postCurrentInfor.data.data);
    console.log("===setCurrentPost", postCurrentInfor.data.data);
    console.log("===currentPost", currentPost);
    console.log("===props.description", props.description);
  };

  // chức năng thích bài viết

  const dispatchLike = useDispatch();
  const buttonLiked = useRef();
  const iconLiked = useRef();
  const handleLikePost = async (e) => {
    e.preventDefault();
    await axios({
      method: "patch",
      url: `https://fb-clone-mern.onrender.com/posts/${props.id_post}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: user._id,
      },
    });

    buttonLiked.current.style.color = "#907eff";
    iconLiked.current.style.color = "#907eff";
    dispatchLike(isLike({ like: true }));
  };
  const load = useSelector((state) => state.form.load);

  useEffect(() => {
    const arrayUserLike = Object.keys(props.likes);
    if (arrayUserLike.includes(user._id)) {
      buttonLiked.current.style.color = "#907eff";
      iconLiked.current.style.color = "#907eff";
    }
  }, [load]);

  return (
    <>
      <div className={`${classes.container}`}>
        <div className={classes.container__owner}>
          <div>
            <img
              src={`https://fb-clone-mern.onrender.com/assets/${
                props.picturePath ||
                "https://adoreyou.vn/wp-content/uploads/anh-hot-girl-instagram.jpg"
              }`}
              alt=""
            />
            <div>
              <Link
                className={classes.user}
                to={`/profile/${props.userId}`}
              >{`${props.firstName || "Người"} ${
                props.lastName || "dùng facebook"
              }`}</Link>
              <br />
              {/* <p>{`${props.firstName || "Phan"} ${props.lastName || "Thang"}`}</p> */}
              <small>
                {`${dayFormat}`} &#8226; {`${timeFormat}`}{" "}
              </small>
            </div>
          </div>
          <div>
            <button onClick={handleUpdateForm}>
              {/* <i className="fa-solid fa-ellipsis"></i> */}
              <i className="fa-solid fa-pen" style={{ fontSize: 14 }}></i>
            </button>
            <button onClick={() => hanldeDeletePost(props.idUser)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <p className={classes.container__description}>
          {props.description || "Lỗi dữ liệu"}
        </p>
        <div className={classes.container__file}>
          {/* <img
          src={`https://fb-clone-mern.onrender.com/assets/${props.userPicturePath}`}
          alt=""
        /> */}
          {fileUpload === "mp4" && <Video></Video>}
          {fileUpload === "jpg" && <Image></Image>}
          {fileUpload === "png" && <Image></Image>}
          {/* {fileUpload === undefined && ""} */}
        </div>
        <div className={classes.container__reaction}>
          <div className={classes.container__reactionLike}>
            <img
              className={classes.reaction__post}
              src={`./../../icons/love.png`}
              alt=""
            />
            <img
              className={classes.reaction__post}
              src={`./../../icons/cute.png`}
              alt=""
            />
            <img
              className={classes.reaction__post}
              src={`./../../icons/funny.png`}
              alt=""
            />
            <p>{props.countLikes}</p>
          </div>
          <div className={classes.container__reactionComment}>
            <p onClick={handleViewComment}>
              <span>{numberComments}</span> bình luận
              {/* {viewComments.data.result || "0"} */}
            </p>
            <p>
              <span>0</span> lượt chia sẻ
            </p>
          </div>
        </div>
        <div className={classes.container__actions}>
          <button
            ref={buttonLiked}
            onClick={handleLikePost}
            className={classes.container__actionsLike}
          >
            <i ref={iconLiked} className="fa-regular fa-thumbs-up"></i>
            Thích
          </button>
          <button
            onClick={handleViewComment}
            className={classes.container__actionsComment}
          >
            <i className="fa-regular fa-comment"></i>
            Bình luận
          </button>
          <button className={classes.container__actionsShare}>
            <i className="fa-regular fa-share-from-square"></i>
            Chia sẻ
          </button>
        </div>
        <Comments
          post_id={props.id_post}
          dataComments={viewComments}
        ></Comments>
      </div>
      {openFormUpdate && (
        <UpdateForm
          updatePost={currentPost.description}
          // updatePost={props.description}
          idPostUpdate={props.id_post}
        />
      )}
    </>
  );
};

export default LinkSideBarCenter;
