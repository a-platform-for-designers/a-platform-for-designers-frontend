import { Modal, Box, Avatar, Typography } from "@mui/material";
import AvatarIcon from "../../../../assets/images/designerscarousel-avatar.png";
import "./MessagePopup.scss";
import { useState } from "react";
import { MyButton } from "@/shared/UI";

type Props = {
  userInfo?: string;
  open: boolean;
  onClose?: () => void;
};

type TInputTextArea = HTMLInputElement | HTMLTextAreaElement;

const MessagePopup: React.FC<Props> = ({ userInfo, open, onClose }) => {
  const [message, setMessage] = useState<string>("");

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(message);
  }

  function handleChangeMessage(event: React.ChangeEvent<TInputTextArea>) {
    setMessage(event.target.value);
  }

  return (
    <>
      <Modal className="messagePopup" onClose={onClose} open={open}>
        <Box component="section" className="messagePopup__container">
          <div className="messagePopup__header">
            <div className="messagePopup__user">
              <Avatar className="messagePopup__avatar" src={AvatarIcon} />
              <Typography component="h2" className="messagePopup__name">
                {userInfo}
              </Typography>
            </div>
            <button
              className="messagePopup__close-button"
              onClick={onClose}
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
      </Modal>
    </>
  );
};

export default MessagePopup;
