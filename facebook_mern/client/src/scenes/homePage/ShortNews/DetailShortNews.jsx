import React from "react";
import { Link, useParams } from "react-router-dom";
import Stories from "../../../components/Stories/Stories";
import NavBar from "../../navbar/NavBar";
import classes from "./DetailShortNews.module.css";

const DUMMY_SHORTNEWS = [
  {
    id: "stories1",
    imagePath: "https://htran844.github.io/hihi/img/ig/i22.jpg",
    name: "Thảo Linh",
    avatar: "https://htran844.github.io/hihi/img/ig/i22.jpg",
    timeCreate: "5 giờ",
  },
  {
    id: "stories2",
    imagePath: "https://htran844.github.io/hihi/img/ig/i23.jpg",
    name: "Phan Binh",
    avatar: "https://htran844.github.io/hihi/img/ig/i23.jpg",
    timeCreate: "7 giờ",
  },
  {
    id: "stories3",
    imagePath: "https://htran844.github.io/hihi/img/ig/i24.jpg",
    name: "Ngan Ha",
    avatar: "https://htran844.github.io/hihi/img/ig/i24.jpg",
    timeCreate: "9 giờ",
  },
  {
    id: "stories4",
    imagePath: "https://htran844.github.io/hihi/img/ig/i25.jpg",
    name: "Nguyen Xuan",
    avatar: "https://htran844.github.io/hihi/img/ig/i25.jpg",
    timeCreate: "12 giờ",
  },
  {
    id: "stories5",
    imagePath: "https://htran844.github.io/hihi/img/ig/i1.jpg",
    name: "Thanh Hien",
    avatar: "https://htran844.github.io/hihi/img/ig/i1.jpg",
    timeCreate: "23 giờ",
  },
  {
    id: "stories6",
    imagePath: "https://htran844.github.io/hihi/img/ig/i6.jpg",
    name: "Thien Thao",
    avatar: "https://htran844.github.io/hihi/img/ig/i6.jpg",
    timeCreate: "3 giờ",
  },
  {
    id: "stories7",
    imagePath: "https://htran844.github.io/hihi/img/ig/i7.jpg",
    name: "Black Angle",
    avatar: "https://htran844.github.io/hihi/img/ig/i7.jpg",
    timeCreate: "1 giờ",
  },
  {
    id: "stories8",
    imagePath: "https://htran844.github.io/hihi/img/ig/i8.jpg",
    name: "Miranda Kerr",
    avatar: "https://htran844.github.io/hihi/img/ig/i8.jpg",
    timeCreate: "8 giờ",
  },
];

const DetailShortNews = () => {
  const paramsIdStories = useParams();
  const detailStory = DUMMY_SHORTNEWS.filter(
    (x) => x.id === paramsIdStories.idStories
  );
  return (
    <div className={classes.container}>
      <div className={classes.navigation}>
        <NavBar></NavBar>
      </div>
      <div className={classes.stories}>
        <div className={classes.stories__menu}>
          <h3>Tin</h3>
          <Link className={classes.stories__menu_store} to={"#"}>
            Kho lưu trữ
          </Link>
          <p>Tin của bạn</p>
          <Link to={"#"} className={classes.stories__menu_create}>
            <div className={classes.stories__menu_create_button}>
              <button className="fa-solid fa-plus"></button>
            </div>
            <div className={classes.stories__menu_create_text}>
              <p>Tạo tin</p>
              <small>Bạn có thể chia sẻ ảnh hoặc viết gì đó</small>
            </div>
          </Link>
          <div className={classes.stories__menu_user}>
            <p>Tất cả tin</p>
            <ul className={classes.stories__menu_user_all}>
              {DUMMY_SHORTNEWS.map((story) => (
                <Stories
                  backgroundColor={
                    story.id === detailStory[0].id ? "#dfe1e3" : ""
                  }
                  key={story.id}
                  imagePath={story.imagePath}
                  name={story.name}
                  id={story.id}
                  timeCreate={story.timeCreate}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className={classes.stories__content}>
          <div className={classes.stories__content_box}>
            <div className={classes.stories__content_box_title}>
              {/* <div className={classes.separate}></div> */}
              <div className={classes.stories__content_box_title_username}>
                <img
                  src={detailStory[0].avatar}
                  alt=""
                  width={40}
                  height={40}
                />
                <h3 className="">
                  {detailStory[0].name} <span>{detailStory[0].timeCreate}</span>
                </h3>
              </div>
              <div className={classes.stories__content_box_title_handle}>
                <i className="fa-solid fa-play"></i>
                <i className="fa-solid fa-volume-xmark"></i>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </div>
            <img src={detailStory[0].imagePath} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailShortNews;
