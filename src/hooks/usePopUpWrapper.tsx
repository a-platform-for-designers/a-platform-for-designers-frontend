import React, { FC, ReactElement, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { togglePopUp } from "@/redux/slices/popUpSlice";

interface PopUpProps {
  onClose: () => void;
  open: boolean;
}

interface UsePopUpResult {
  PopUpWrapper: FC<{ popUpId: string; children: ReactElement<PopUpProps> }>;
}

const usePopUpWrapper = (): UsePopUpResult => {
  const dispatch = useAppDispatch();
  const popUps = useAppSelector((state) => state.popUp);

  
  const PopUpWrapper: FC<{
    popUpId: string;
    children: ReactElement<PopUpProps>;
  }> = ({ popUpId, children }) => {
    const closePopUp = useCallback((popUpId: string) => {
      dispatch(togglePopUp({ [popUpId]: false }));
    }, []);

    return React.cloneElement(children, {
      onClose: () => closePopUp(popUpId),
      open: popUps[popUpId],
    });
  };

  return {
    PopUpWrapper,
  };
};

export default usePopUpWrapper;
