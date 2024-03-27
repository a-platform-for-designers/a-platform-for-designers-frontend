import { Drawer } from "@mui/material";
import "./AuthScreen.scss";
import { PropsWithChildren } from "react";
import { Screens } from "@/types";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { hideScreen } from "@/redux/slices/authSlice";

type Props = {
  screen?: Screens;
};

const AuthScreen: React.FC<PropsWithChildren<Props>> = ({
  children,
  screen,
}) => {
  const dispatch = useAppDispatch();
  const { currentScreen } = useAppSelector((state) => state.auth);
  const isOpen = currentScreen === screen;

  const onClose = () => {
    dispatch(hideScreen());
  };

  return (
    <Drawer
      className="MyPopup"
      anchor="right"
      open={isOpen}
      onClose={onClose}
      transitionDuration={{ enter: 800, exit: 600 }}
    >
      {children}
      <button className="MyPopup__close-button" onClick={onClose}></button>
    </Drawer>
  );
};

export default AuthScreen;
