import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostForm from "../../components/PostForm/PostForm";
import LinkSideBarCenter from "../../components/SideBarCenter/LinkSideBarCenter";
import classes from "./UserPosts.module.css";

const UserPosts = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const getUserPosts = async () => {
      const userPosts = await axios({
        method: "get",
        url: `http://localhost:3001/posts/${props.userId}/posts`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserPosts(userPosts.data.data);
    };
    getUserPosts();
  }, []);
  return (
    <div>
      <PostForm />
      {userPosts.map((post, index) => (
        // <LinkSideBarCenter
        //   key={index}
        //   idUser={post._id}
        //   userId={post.userId}
        //   // className={classes.children}
        //   picturePath={post.picturePath}
        //   firstName={post.firstName}
        //   lastName={post.lastName}
        //   createAt={post.createdAt}
        //   description={post.description}
        //   userPicturePath={post.userPicturePath}
        // />
        <LinkSideBarCenter
          id_post={post._id}
          key={post._id}
          idUser={post._id}
          userId={post.userId}
          // className={classes.children}
          picturePath={post.picturePath}
          firstName={post.firstName}
          lastName={post.lastName}
          createAt={post.createdAt}
          description={post.description}
          userPicturePath={post.userPicturePath}
          countLikes={post.countLikes}
          likes={post.likes}
        />
      ))}
    </div>
  );
};

export default UserPosts;
