import { StyledEngineProvider } from "@mui/material";
import "./InfoAction.scss";
import React from "react";
import MyButton, { IMyButtonProps } from "@/components/UI/MyButton/MyButton";

interface IIsLoggedData {
  label: string;
  onClick?: React.MouseEventHandler;
}

export interface IInfoActionData extends IMyButtonProps {
  isCurrentUser: boolean;
  ifTrue?: IIsLoggedData;
  ifFalse?: IIsLoggedData;
}

const InfoAction: React.FC<IInfoActionData> = ({
  isCurrentUser = false,
  ifTrue = { label: "Текст при login=true" },
  ifFalse = { label: "Текст при login=false" },
  ...data
}) => {
  if (isCurrentUser) {
    return (
      <StyledEngineProvider injectFirst>
        <MyButton
          {...data}
          className={`infoAction ${data.className}`}
          onClick={ifTrue.onClick}
        >
          {ifTrue.label}
        </MyButton>
      </StyledEngineProvider>
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <MyButton
        {...data}
        className={`infoAction ${data.className}`}
        onClick={ifFalse.onClick}
      >
        {ifFalse.label}
      </MyButton>
    </StyledEngineProvider>
  );
};

export default InfoAction;
