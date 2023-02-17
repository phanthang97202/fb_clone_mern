import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormDataPost from "../../../components/PostForm/FormDataPost";
import MeetForm from "../../../components/PostForm/MeetForm";
import PostForm from "../../../components/PostForm/PostForm";
import LinkSideBarCenter from "../../../components/SideBarCenter/LinkSideBarCenter";
import UpdateForm from "../../../components/UpdateForm/UpdateForm";
import { setPosts } from "../../../state";
import { isLoad, isUpdateSuccess } from "../../../state/form";
import ShortNews from "../ShortNews/ShortNews";
// import ShortNews from "./ShortNews";

const SideBarCenter = () => {
  // const [posts, setPost] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const postsUser = useSelector((state) => state.auth.posts);
  const dispatch = useDispatch();

  const load = useSelector((state) => state.form.load);
  const isUpdateSuccess = useSelector((state) => state.form.updateSuccess);
  const isLiked = useSelector((state) => state.form.like);
  const dispatchLoading = useDispatch();
  useEffect(() => {
    const getUserPosts = async () => {
      const userPosts = await axios({
        method: "GET",
        url: "https://fb-clone-mern.onrender.com/posts",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(userPosts);
      // setPost(userPosts.data.data);
      dispatch(
        setPosts({
          posts: userPosts.data.data,
        })
      );
      dispatchLoading(isLoad({ isLoading: false }));
    };
    getUserPosts();
  }, [load, isUpdateSuccess, isLiked]);
  // console.log("==posts", posts);
  // const handleOpenForm = () => {
  //   console.log("open form");
  // };
  return (
    <div>
      <ShortNews />
      <PostForm />
      {/* <FormDataPost /> */}
      <MeetForm />
      {postsUser.map((post, index) => (
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

export default SideBarCenter;
