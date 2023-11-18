import { PropsWithChildren } from "react";
import "./MyAuthForm.scss";
import { StyledEngineProvider } from "@mui/material/styles";

interface IMyAuthFormProps {
  title: string;
}

const MyAuthForm: React.FC<PropsWithChildren<IMyAuthFormProps>> = ({
  children,
  title,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="myAuthForm">
        <div className="myAuthForm__wrapper">
          <h1 className="myAuthForm__title">{title}</h1>
          {children}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default MyAuthForm;
