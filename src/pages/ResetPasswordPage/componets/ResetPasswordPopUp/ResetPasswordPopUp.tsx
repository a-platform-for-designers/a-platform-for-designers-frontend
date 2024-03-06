import { useState, FC, useCallback, useEffect } from "react";
import ConfirmPassword from "@/shared/ConfirmPassword/confirmPassword";
import { useParams } from "react-router-dom";
import { Drawer } from "@mui/material";

const ResetPasswordPopUp: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { uid, token } = useParams();

  useEffect(() => {
    if (uid && token) {
      setIsOpen(true);
    }
  }, [uid, token]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (uid && token) {
    return (
      <Drawer
        className="MyPopup"
        onClose={handleClose}
        anchor="right"
        open={isOpen}
      >
        <ConfirmPassword uid={uid} token={token} onClose={handleClose} />
        <button
          className="MyPopup__close-button"
          onClick={handleClose}
        ></button>
      </Drawer>
    );
  }

  return null;
};

export default ResetPasswordPopUp;
