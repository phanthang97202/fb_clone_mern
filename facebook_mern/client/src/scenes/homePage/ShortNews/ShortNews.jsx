import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShortNewsItem from "../../../components/ShortNews/ShortNewsItem";
import ShortNewsMe from "../../../components/ShortNews/ShortNewsMe";
import classes from "./ShortNews.module.css";

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
const ShortNews = () => {
  const [randomNews, setRandomNews] = useState({});
  useEffect(() => {
    let startRandom = Math.round(Math.random() * (DUMMY_SHORTNEWS.length - 4));
    const endRandom = startRandom + 4;

    if (DUMMY_SHORTNEWS.length > 1 && DUMMY_SHORTNEWS < 4) {
      setRandomNews({
        startRandom: 0,
        endRandom: 4,
      });
    }

    setRandomNews({
      startRandom: startRandom,
      endRandom: endRandom,
    });

    console.log("===random", startRandom, endRandom);
  }, []);

  return (
    <div className={classes.container}>
      {/* <Link to={"/stories/create"}>
        <ShortNewsMe />
      </Link> */}
      <ShortNewsMe />
      {DUMMY_SHORTNEWS.slice(randomNews.startRandom, randomNews.endRandom).map(
        (item) => (
          <Link key={item.id} to={`/stories/${item.id}`}>
            <ShortNewsItem
              avatar={item.avatar}
              imagePath={item.imagePath}
              name={item.name}
            />
          </Link>
        )
      )}
      <button className={classes.viewmore}>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default ShortNews;
