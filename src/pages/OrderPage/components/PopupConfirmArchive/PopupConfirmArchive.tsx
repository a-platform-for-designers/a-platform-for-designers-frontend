import { Modal, Box, Typography } from "@mui/material";
import "./PopupConfirmArchive.scss";
import { useEffect, useRef, useCallback } from "react";
import { MyButton } from "@/shared/UI";

interface KeyboardEvent {
  key: string;
}

interface IProps {
  setPopupArchive: (boolean: boolean) => void;
  isArchivePopup: boolean;
  handleArchive: () => void;
}

const PopupConfirmArchive: React.FC<IProps> = ({
  setPopupArchive,
  isArchivePopup,
  handleArchive,
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    setPopupArchive(false);
  }, [setPopupArchive]);

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
  }, [popupRef, handleClose]);

  return (
    <Modal
      className="popupConfirmArchive"
      onClose={handleClose}
      open={isArchivePopup}
    >
      <Box
        component="section"
        className="popupConfirmArchive__container"
        ref={popupRef}
      >
        <button
          className="popupConfirmArchive__close-button"
          onClick={handleClose}
        ></button>
        <Typography component="h2" className="popupConfirmArchive__title">
          Перенести заказ в архив?
        </Typography>
        <div className="popupConfirmArchive__buttons">
          <MyButton
            variant="outlined"
            type="submit"
            size="medium"
            onClick={handleClose}
            className="popupConfirmArchive__submit-button"
          >
            Отменить
          </MyButton>
          <MyButton
            type="submit"
            size="medium"
            onClick={handleArchive}
            className="popupConfirmArchive__submit-button"
          >
            Перенести
          </MyButton>
        </div>
      </Box>
    </Modal>
  );
};

export default PopupConfirmArchive;
