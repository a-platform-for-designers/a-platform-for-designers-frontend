import { Drawer } from "@mui/material";
import "./MyPopup.scss";
import { PropsWithChildren } from "react";

type Props = {
  open?: boolean;
  onClose?: () => void;
  onClick?: () => void;
};

const MyPopup: React.FC<PropsWithChildren<Props>> = ({
  children,
  onClose,
  open,
}) => {
  return (
    <>
      <Drawer className="MyPopup" anchor="right" open={open} onClose={onClose}>
        {children}
        <button className="MyPopup__close-button" onClick={onClose}></button>
      </Drawer>
    </>
  );
};

export default MyPopup;
