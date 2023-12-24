// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax } from "swiper/modules";
import { StyledEngineProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import "swiper/css";
import "swiper/css/navigation";
import "./MySwiper.scss";
import Favourites from "@/assets/icons/FavouritesWhite.svg";
import Likes from "@/assets/icons/Likes.svg";
import FavouritesActive from "@/assets/icons/FavouritesWhiteActive.svg";
import LikesActive from "@/assets/icons/LikesActive.svg";
import { IconButton } from "@mui/material";
import { ICase } from "@/types";
import { useState } from "react";
import { getOptimizedImage } from "@/features/getOptimizedImage";

interface IProps {
  onClick?: () => void;
  item: ICase;
}

const MySwiper: React.FC<IProps> = ({ item, onClick }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  if (!item) return;

  const sliders = item.images.map((image) => {
    return (
      <SwiperSlide key={image.id}>
        <img
          src={getOptimizedImage(image.image, 660, 480, "webp", "7d")}
          alt="Картинка из проекта"
        />
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
          <h2 className="mySwiper__heading">{item.title}</h2>
          <div className="mySwiper__action-bar">
            <div className="mySwiper__author-info">
              <Avatar
                className="mySwiper__avatar"
                alt="avatar"
                src={item.author.photo}
              >
                {!item.author.photo &&
                  `${item.author?.first_name[0]}${item.author?.last_name[0]}`}
              </Avatar>
              <p className="mySwiper__author-name">{`${item.author.first_name} ${item.author.last_name} `}</p>
            </div>
            <div className="mySwiper__icon-container">
              <IconButton
                className="mySwiper__icon"
                aria-label="add to favourites"
                edge="end"
                onClick={() => {
                  setIsFavorite(!isFavorite);
                }}
              >
                <img src={isFavorite ? FavouritesActive : Favourites} />
              </IconButton>
              <IconButton
                className="mySwiper__icon"
                aria-label="put like"
                edge="end"
                onClick={() => {
                  setIsLiked(!isLiked);
                }}
              >
                <img src={isLiked ? LikesActive : Likes} />
              </IconButton>
            </div>
          </div>
        </div>
        <SwiperSlide>
          <img
            src={getOptimizedImage(item.avatar, 660, 480, "webp", "7d")}
            alt="Обложка проекта"
          />
        </SwiperSlide>
        {sliders}
      </Swiper>
    </StyledEngineProvider>
  );
};

export default MySwiper;
