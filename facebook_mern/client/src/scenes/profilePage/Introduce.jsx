import React from "react";
import { Link } from "react-router-dom";
import classes from "./Introduce.module.css";
const Introduce = (props) => {
  return (
    <div>
      <div className={classes.introduce}>
        <h2>Giới thiệu</h2>
        <button className={classes.add_stories}>Thêm tiểu sử</button>
        <ul className={classes.introduce__common}>
          <li>
            {/* <img src={`./../../icons/student_intro.png`} alt="" /> */}
            <i className="fa-solid fa-graduation-cap"></i>
            <p>
              Công việc <strong>{props.work}</strong>
            </p>
          </li>
          <li>
            {/* <img src={`./../../icons/home_intro.png`} alt="" /> */}
            <i className="fa-solid fa-house-chimney"></i>
            <p>
              Sống tại <strong>{props.live}</strong>
            </p>
          </li>
        </ul>
        <button className={classes.edit_detail}>Chỉnh sửa chi tiết</button>
        <ul className={classes.hobbies}>
          <li>
            <span>⚽</span> Bóng đá
          </li>
          <li>
            <span>🎥</span> Xem phim
          </li>
          <li>
            <span>🎼</span> Nghe nhạc
          </li>
        </ul>
        <button className={classes.edit_hobbies}>Chỉnh sửa Sở thích</button>
      </div>

      <div className={classes.introduce__images}>
        <div className={classes.introduce__images_title}>
          <h2>Ảnh</h2>
          <Link className={classes.view__all_images} to={"#"}>
            Xem tất cả ảnh
          </Link>
        </div>
        <ul className={classes.introduce__images_item}>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
          </li>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
          </li>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
          </li>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
          </li>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
          </li>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
          </li>
        </ul>
      </div>
      <div className={classes.friends}>
        <div className={classes.introduce__images_title}>
          <h2>Bạn bè</h2>
          <Link className={classes.view__all_images} to={"#"}>
            Xem tất cả bạn bè
          </Link>
        </div>
        <ul className={classes.introduce__images_item}>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
            <p>Chanh Phan</p>
          </li>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
            <p>Chanh Phan</p>
          </li>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
            <p>Chanh Phan</p>
          </li>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
            <p>Chanh Phan</p>
          </li>
          <li>
            <img src="https://htran844.github.io/hihi/img/ig/i22.jpg" alt="" />
            <p>Chanh Phan</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Introduce;
