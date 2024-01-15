import { Modal, Box, Avatar, Typography } from "@mui/material";
import "./MyMessagePopup.scss";
import { useEffect, useRef, useState, useCallback } from "react";
import { MyButton } from "@/shared/UI";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { chartsService } from "@/api";
import ReactDOM from "react-dom";
import { hideMessagePopUp } from "@/redux/slices/chatSlice";
import { enqueueSnackbar } from "notistack";
import { userService } from "@/api";
import { IUser } from "@/types";
// import Preloader from "../../Preloader/Preloader"

const portal = document.getElementById("portal") as Element;

interface KeyboardEvent {
  key: string;
}

type TInputTextArea = HTMLInputElement | HTMLTextAreaElement;

const MessagePopup = () => {
  const [message, setMessage] = useState<string>("");
  const { isAuth } = useAppSelector((state) => state.auth);
  const { popUpOn, receiverId } = useAppSelector((state) => state.chat);
  const [receiverInfo, setReseiverInfo] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(isLoading);

  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    dispatch(hideMessagePopUp());
  }, [dispatch]);

  useEffect(() => {
    if (receiverId) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const userInfo = await userService.getUserById(receiverId);
          setReseiverInfo(userInfo);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [receiverId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupRef, popUpOn, receiverId, handleClose]);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      //ToDo использовать redux thunks, в т.ч. для обработки и показа ошибок
      if (receiverId && isAuth) {
        await chartsService.sendMessage({
          receiver: receiverId,
          text: message,
        });
      } else {
        enqueueSnackbar({
          variant: "error",
          message: "Для отправки сообщения необходимо авторизоваться",
        });
      }
      dispatch(hideMessagePopUp());
    } catch (error) {
      console.error("ошибка: ", { error });
      dispatch(hideMessagePopUp());
    }
  }

  function handleChangeMessage(event: React.ChangeEvent<TInputTextArea>) {
    setMessage(event.target.value);
  }

  return ReactDOM.createPortal(
    <Modal className="messagePopup" onClose={handleClose} open={popUpOn}>
      <Box
        component="section"
        className="messagePopup__container"
        ref={popupRef}
      >
        <div className="messagePopup__header">
          {receiverInfo ? (
            <div className="messagePopup__user">
              <Avatar
                className="messagePopup__avatar"
                src={receiverInfo.photo}
                sx={{ backgroundColor: "#4F378B", color: "#EADDFF" }}
              >
                {!receiverInfo.photo &&
                  `${receiverInfo?.first_name[0]}${receiverInfo?.last_name[0]}`}
              </Avatar>
              <Typography component="h2" className="messagePopup__name">
                {receiverInfo.first_name}&nbsp;
                {receiverInfo.last_name}
              </Typography>
            </div>
          ) : null}
          <button
            className="messagePopup__close-button"
            onClick={handleClose}
          ></button>
        </div>
        <textarea
          onChange={handleChangeMessage}
          id="message"
          name="message"
          className="messagePopup__input"
          placeholder="Текст сообщения"
        />
        <MyButton
          type="submit"
          size="medium"
          onClick={handleSubmit}
          className="messagePopup__submit-button"
        >
          Отправить
        </MyButton>
      </Box>
    </Modal>,
    portal
  );
};

export default MessagePopup;
