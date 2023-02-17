import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import LinkSideBarCenter from "../../components/SideBarCenter/LinkSideBarCenter";
import LinkSideBarLeft from "../../components/SideBarLeft/LinkSideBarLeft";
// import { setPosts } from "../../state";
import NavBar from "../navbar/NavBar";
import classes from "./Search.module.css";

const Post = () => {
  const [searchPosts, setSearchPosts] = useState([]);
  const token = useSelector((state) => state.auth.token);
  // const dispatch = useDispatch();
  // const postsUser = useSelector((state) => state.auth.posts);
  const location = useLocation();
  console.log("==location", location, location.search);
  useEffect(() => {
    const getUserPosts = async () => {
      const userPosts = await axios({
        method: "GET",
        url: `http://localhost:3001/posts${location.search}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSearchPosts(userPosts.data.data);
      console.log("====userSearch", userPosts.data.data);
    };
    getUserPosts();
  }, [location.search]);

  return (
    <div>
      <NavBar />
      <div className={classes.container}>
        <div className={classes.container__sidebar}>
          <LinkSideBarLeft icon="heart" title="Hẹn hò" />
          <LinkSideBarLeft icon="pageaside" title="Trang" />
          <LinkSideBarLeft icon="groupaside" title="Nhóm" />
          <LinkSideBarLeft icon="gameaside" title="Chơi game" />
          <LinkSideBarLeft icon="metaaside" title="Meta Facebook" />
        </div>
        <div className={classes.container__result}>
          <div>
            {searchPosts.map((post, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default Post;
