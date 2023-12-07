import { Modal, Box, Avatar, Typography } from "@mui/material";
import AvatarIcon from "../../../../assets/images/designerscarousel-avatar.png";
import "./MessagePopup.scss";
import { MyButton, MyInput } from "@/shared/UI";
import useInput from "@/hooks/useInput";

type Props = {
  userInfo?: string;
  open: boolean;
  onClose?: () => void;
};

const MessagePopup: React.FC<Props> = ({ userInfo, open, onClose }) => {
  const message = useInput("", {});

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const value = {
      message: message.value,
    };
    console.log(value);
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
          <MyInput
            variant="text"
            className="messagePopup__input"
            placeholder="Текст сообщения"
            data={message}
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
