import { useState, FC, useCallback, useEffect } from "react";
import { MyPopup } from "@/shared/UI";
import ConfirmPassword from "@/shared/ConfirmPassword/confirmPassword";
import { useParams } from "react-router-dom";

interface UsePopUpResult {
  ResetPasswordForm: FC;
}

const useResetPassword = (): UsePopUpResult => {
  const [isOpen, setIsOpen] = useState(true);
  const { uid, token } = useParams();

  useEffect(() => {
    if (uid && token) {
      //setIsOpen(true);
    }
  }, [uid, token]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const ResetPasswordForm: FC = () => (
    <MyPopup onClose={handleClose} open={isOpen}>
      <ConfirmPassword uid={uid} token={token} onClose={handleClose}/>
    </MyPopup>
  );

  return {
    ResetPasswordForm,
  };
};

export default useResetPassword;
