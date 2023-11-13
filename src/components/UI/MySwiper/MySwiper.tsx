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

interface IProps {
  onClick?: () => void;
}

const MySwiper: React.FC<IProps> = ({ onClick }) => {
  const images = [
    "https://scientificrussia.ru/images/b/teb-full.jpg",
    "https://fond-vsem-mirom.ru/wp-content/uploads/2020/06/gk_zdhbg784.jpg",
    "https://oir.mobi/uploads/posts/2022-09/1662133482_1-oir-mobi-p-britanskaya-pryamoukhaya-koshka-krasivo-1.jpg",
    "https://koshka.top/uploads/posts/2021-12/1638880950_1-koshka-top-p-britanskaya-golubaya-visloukhaya-1.jpg",
  ];

  const sliders = images.map((image, index) => {
    return (
      <SwiperSlide key={index}>
        <img src={image} alt="image" />
      </SwiperSlide>
    );
  });

  return (
    <StyledEngineProvider injectFirst>
      <Swiper
        modules={[Navigation, Pagination, Parallax]}
        loop={true}
        navigation={true}
        pagination={false}
        parallax={false}
        className="mySwiper"
        onClick={onClick}
      >
        <div className="mySwiper__lower-part">
          <h2 className="mySwiper__heading">
            Название проекта Название проекта Название проекта
          </h2>
          <div className="mySwiper__action-bar">
            <div className="mySwiper__author-info">
              <Avatar
                className="mySwiper__avatar"
                alt="avatar"
                src="https://storage.theoryandpractice.ru/tnp/uploads/image_unit/000/156/586/image/base_87716f252d.jpg"
                tabIndex={-1}
              />
              <p className="mySwiper__author-name">Имя Фамилия Имя Фамилия</p>
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
