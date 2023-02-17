import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isComment } from "../../state/form";
import classes from "./Comments.module.css";
const Comments = (props) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [comment, setComment] = useState("");

  const handleWriteComment = (e) => {
    setComment(e.target.value);
    // console.log(comment);
  };
  const buttonRef = useRef();
  // console.log(buttonRef);
  const dispatchComment = useDispatch();
  const hanlderPostCommentUserOnPost = () => {
    const dataCommentOnPost = async () => {
      return await axios({
        method: "post",
        url: "http://localhost:3001/comments/",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          user: user._id,
          post: props.post_id,
          // post: "63c812cb519fa6fffc15815e",
          comment: comment,
        },
      });

      // console.log(data);
      // props.numberComments(data.data.result)
    };
    dataCommentOnPost();
    dispatchComment(
      isComment({
        comment: true,
      })
    );
  };

  useEffect(() => {
    const postComment = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        hanlderPostCommentUserOnPost();
        setComment("");
      }
    };
    if (comment !== "") {
      buttonRef.current.addEventListener("keyup", postComment);
    } else {
      buttonRef.current.setAttribute("placeholder", "Viết bình luận...");
    }
    const buttonCommentNode = buttonRef.current;
    return () => {
      buttonCommentNode.removeEventListener("keyup", postComment);
    };
  }, [comment]);
  return (
    <div className={classes.comment_post}>
      <div className={classes.comment__form}>
        <img src={`http://localhost:3001/assets/${user.picturePath}`} alt="" />
        <div className={classes.comment__input}>
          <input
            ref={buttonRef}
            value={comment}
            onChange={handleWriteComment}
            type="text"
            placeholder="Viết bình luận..."
          />
          <ul>
            <li>
              <img src={`./../../icons/stiker_comment.png`} alt="" />
            </li>
            <li>
              <img src={`./../../icons/camera_comment.png`} alt="" />
            </li>
            <li>
              <img src={`./../../icons/gif_comment.png`} alt="" />
            </li>
            <li>
              <img src={`./../../icons/icon_comment.png`} alt="" />
            </li>
          </ul>
        </div>
      </div>
      {props.dataComments.map((comment, index) => (
        <div key={index} className={classes.all__comments}>
          <img
            width={32}
            height={32}
            src={`http://localhost:3001/assets/${comment.user.picturePath}`}
            alt=""
          />
          <div>
            <div>
              <Link
                className={classes.link_user_post}
                to={`/profile/${comment.user._id}`}
              >
                {`${comment.user.firstName} ${comment.user.lastName}`}
              </Link>
              <p>{comment.comment}</p>
            </div>
            <p>
              <span>Thích</span>
              <strong>Phản hồi</strong>
              <span>{comment.createdAt}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
