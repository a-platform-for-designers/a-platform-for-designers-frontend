import React, {
  useState,
  FC,
  ReactElement,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { Modal, Paper } from "@mui/material";

interface PopUpProps {
  closePopUp: () => void;
}

interface UsePopUpResult {
  openPopUp: () => void;
  closePopUp: () => void;
  PopUpWrapper: FC<{ children: ReactElement<PopUpProps> }>;
}

const usePopUp = (): UsePopUpResult => {
  const [isOpen, setIsOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement | null>(null);

  const openPopUp = () => {
    setIsOpen(true);
  };

  const closePopUp = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopUp();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopUp();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupRef, closePopUp]);

  const PopUpWrapper: FC<{ children: ReactElement<PopUpProps> }> = ({
    children,
  }) => {
    return isOpen
      ? createPortal(
          <Modal
            open={isOpen}
            onClose={closePopUp}
            ref={popupRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper className="popup-content">
              {React.cloneElement(children, { closePopUp })}
            </Paper>
          </Modal>,
          document.body
        )
      : null;
  };

  return {
    openPopUp,
    closePopUp,
    PopUpWrapper,
  };
};

export default usePopUp;
