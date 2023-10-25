import { Drawer } from "@mui/material";
import "./MyPopup.scss";
import { PropsWithChildren, useState } from "react";
import MyButton from "../MyButton/MyButton";

type Props = {
  open?: boolean;
  label: string;
  onClose?: () => void;
  onClick?: () => void;
};

const MyPopup: React.FC<PropsWithChildren<Props>> = ({ children, label }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <MyButton label={label} onClick={() => setShowPopup(true)} />
      <Drawer
        className="MyPopup"
        anchor="right"
        open={showPopup}
        onClose={() => setShowPopup(false)}
      >
        {children}
        <button
          className="MyPopup__close-button"
          onClick={() => setShowPopup(false)}
        ></button>
      </Drawer>
    </>
  );
};

export default MyPopup;
