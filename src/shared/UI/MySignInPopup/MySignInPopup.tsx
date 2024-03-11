import { useState } from "react";
import { MyAuthForm, MyPopup } from "@/shared/UI";
import SignIn from "@/shared/SignIn/SignIn";
import { StyledEngineProvider } from "@mui/material";
import UserRole from "@/shared/UserRole/UserRole";
import SignUp from "@/shared/SignUp/SignUp";
import ResetPassword from "@/shared/ResetPassword/resetPassword";

interface IProps {
  setOpenSignInPopup: (boolean: boolean) => void;
}

const MySignInPopup: React.FC<IProps> = ({ setOpenSignInPopup }) => {
  const [isOpenSignIn, setIsOpenSignIn] = useState<boolean>(true);
  const [isOpenSignUp, setIsOpenSignUp] = useState<boolean>(false);
  const [isOpenRecovery, setIsOpenRecovery] = useState<boolean>(false);
  const [isRoleSelected, setIsRoleSelected] = useState<boolean>(false);
  const [isCustomer, setIsCustomer] = useState<boolean>(true);

  function chooseCustomerRole() {
    setIsRoleSelected(true);
    setIsCustomer(true);
  }

  function chooseDesignerRole() {
    setIsRoleSelected(true);
    setIsCustomer(false);
  }

  function handleClose() {
    setIsOpenSignIn(false);
    setIsOpenSignUp(false);
    setIsRoleSelected(false);
    setIsOpenRecovery(false);
    setOpenSignInPopup(false);
  }

  function openSignInPopup() {
    handleClose();
    setIsOpenSignIn(true);
  }

  function openSignUpPopup() {
    setIsOpenSignUp(true);
  }

  function openRecovery() {
    setIsOpenSignIn(false);
    setIsOpenSignUp(false);
    setIsRoleSelected(false);
    setIsOpenRecovery(true);
  }

  return (
    <StyledEngineProvider injectFirst>
      <MyPopup onClose={handleClose} open={isOpenSignIn}>
        <MyAuthForm title="Вход">
          <SignIn
            openSignUpPopup={openSignUpPopup}
            openRecoveryPopUp={openRecovery}
          />
        </MyAuthForm>
      </MyPopup>

      <MyPopup onClose={handleClose} open={isOpenRecovery}>
        <ResetPassword openSignUpPopup={openSignUpPopup} />
      </MyPopup>

      <MyPopup onClose={handleClose} open={isOpenSignUp}>
        {isRoleSelected === false ? (
          <UserRole
            onChooseDesignerRole={chooseDesignerRole}
            onChooseCustomerRole={chooseCustomerRole}
          />
        ) : (
          <MyAuthForm title="Регистрация">
            <SignUp openSignInPopup={openSignInPopup} isCustomer={isCustomer} />
          </MyAuthForm>
        )}
      </MyPopup>
    </StyledEngineProvider>
  );
};

export default MySignInPopup;
