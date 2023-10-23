import { Drawer } from "@mui/material";
import "./MyPopup.scss";
import { PropsWithChildren, useState } from "react";
import MyButton from "../MyButton/MyButton";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

const MyPopup: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <MyButton label="open" onClick={() => setShowPopup(true)} />
      <Drawer
        anchor="right"
        open={showPopup}
        onClose={() => setShowPopup(false)}
      >
        {children}
      </Drawer>
    </>
  );
};

export default MyPopup;
