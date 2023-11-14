// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax } from "swiper/modules";
import { StyledEngineProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import "swiper/css";
import "swiper/css/navigation";
import "./MySwiper.scss";
import Favourites from "../../../assets/icons/Favourites.svg";
import Likes from "../../../assets/icons/Likes.svg";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface ICase {
  id: number;
  title: string;
  author: string;
  avatar: string;
  images: string[];
}

const MySwiper: React.FC<ICase> = ({ id, title, author, avatar, images }) => {
  // const images = [
  //   "https://scientificrussia.ru/images/b/teb-full.jpg",
  //   "https://fond-vsem-mirom.ru/wp-content/uploads/2020/06/gk_zdhbg784.jpg",
  //   "https://oir.mobi/uploads/posts/2022-09/1662133482_1-oir-mobi-p-britanskaya-pryamoukhaya-koshka-krasivo-1.jpg",
  //   "https://koshka.top/uploads/posts/2021-12/1638880950_1-koshka-top-p-britanskaya-golubaya-visloukhaya-1.jpg",
  // ];

  const sliders = images.map((image, index) => {
    return (
      <SwiperSlide key={index}>
        <img src={image} alt="image" />
      </SwiperSlide>
    );
  });

  const navigate = useNavigate();

  return (
    <StyledEngineProvider injectFirst>
      <Swiper
        modules={[Navigation, Pagination, Parallax]}
        loop={true}
        navigation={true}
        pagination={false}
        parallax={false}
        className="mySwiper"
        onClick={() => navigate(`/case/${id}`)}
      >
        <div className="mySwiper__lower-part">
          <h2 className="mySwiper__heading">{title}</h2>
          <div className="mySwiper__action-bar">
            <div className="mySwiper__author-info">
              <Avatar
                className="mySwiper__avatar"
                alt="avatar"
                src={avatar}
                tabIndex={-1}
              />
              <p className="mySwiper__author-name">{author}</p>
            </div>
            <div className="mySwiper__icon-container">
              <IconButton
                className="mySwiper__icon"
                aria-label="add to favourites"
                edge="end"
                tabIndex={-1}
              >
                <img src={Favourites} />
              </IconButton>
              <IconButton
                className="mySwiper__icon"
                aria-label="put like"
                edge="end"
                tabIndex={-1}
              >
                <img src={Likes} />
              </IconButton>
            </div>
          </div>
        </div>
        {sliders}
      </Swiper>
    </StyledEngineProvider>
  );
};

export default MySwiper;
