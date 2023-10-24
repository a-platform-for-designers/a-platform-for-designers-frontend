import { PropsWithChildren } from "react";
import "./MyAuthForm.scss";
import { StyledEngineProvider } from "@mui/material/styles";

interface IMyAuthFormProps {
  onSubmit?: () => void;
  title: string;
}

const MyAuthForm: React.FC<PropsWithChildren<IMyAuthFormProps>> = ({
  children,
  onSubmit,
  title,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <form className="myAuthForm" onSubmit={onSubmit}>
        <div className="myAuthForm__wrapper">
          <h1 className="myAuthForm__title">{title}</h1>
          {children}
        </div>
      </form>
    </StyledEngineProvider>
  );
};

export default MyAuthForm;
