import { PropsWithChildren } from "react";
import "./MyAuthForm.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import { useAppSelector } from "@/hooks/reduxHooks";

interface IMyAuthFormProps {
  title: string;
}

const MyAuthForm: React.FC<PropsWithChildren<IMyAuthFormProps>> = ({
  children,
  title,
}) => {
  const { loading } = useAppSelector((state) => state.auth);

  return (
    <StyledEngineProvider injectFirst>
      <div className="myAuthForm">
        <div className="myAuthForm__wrapper">
          {loading !== "succeeded" && (
            <h1 className="myAuthForm__title">{title}</h1>
          )}
          {children}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default MyAuthForm;
