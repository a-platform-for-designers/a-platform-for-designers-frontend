import { Modal, Box, Avatar, Typography } from "@mui/material";
import "./MyMessagePopup.scss";
import { useState } from "react";
import { MyButton } from "@/shared/UI";
import { useAppSelector } from "@/hooks/reduxHooks";
import { chartsService } from "@/api";

type Props = {
  open: boolean;
  receiver: number;
  onClose: () => void;
};

type TInputTextArea = HTMLInputElement | HTMLTextAreaElement;

const MessagePopup: React.FC<Props> = ({ open, onClose, receiver }) => {
  const [message, setMessage] = useState<string>("");
  const { user } = useAppSelector((state) => state.user);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      //ToDo использовать redux thunks, в т.ч. для обработки и показа ошибок
      await chartsService.sendMessage({ receiver, text: message });
      onClose();
    } catch (error) {
      console.error("ошибка: ", { error });
      onClose();
    }
  }

  function handleChangeMessage(event: React.ChangeEvent<TInputTextArea>) {
    setMessage(event.target.value);
  }

  return (
    <>
      <Modal className="messagePopup" onClose={onClose} open={open}>
        <Box component="section" className="messagePopup__container">
          <div className="messagePopup__header">
            {user ? (
              <div className="messagePopup__user">
                <Avatar
                  className="messagePopup__avatar"
                  src={user.photo}
                  sx={{ backgroundColor: "#4F378B", color: "#EADDFF" }}
                >
                  {!user.photo && `${user?.first_name[0]}${user?.last_name[0]}`}
                </Avatar>
                <Typography component="h2" className="messagePopup__name">
                  {user.first_name}&nbsp;
                  {user.last_name}
                </Typography>
              </div>
            ) : null}
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
