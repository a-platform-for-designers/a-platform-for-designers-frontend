import { MainPage } from "..";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { enqueueSnackbar } from "notistack";
import {
  activateAccount,
  resetAuthErrors,
  setCurrentScreen,
} from "@/redux/slices/authSlice";
import { Screens } from "@/types";

const ActivateAccountPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { errorMessages } = useAppSelector((state) => state.auth);
  const { uid = "", token = "" } = useParams();

  const handleActivate = async () => {
    const response = await dispatch(activateAccount({ uid, token }));
    if (!("error" in response)) {
      navigate("/");
      dispatch(setCurrentScreen({ screen: Screens.SignIn }));
    } else {
      dispatch(setCurrentScreen({ screen: Screens.Activation }));
    }
  };

  useEffect(() => {
    handleActivate();
  }, [uid, token, dispatch]);

  useEffect(() => {
    errorMessages.forEach((message) => {
      enqueueSnackbar({
        variant: "error",
        message,
      });
    });
    return () => {
      dispatch(resetAuthErrors());
    };
  }, [errorMessages, dispatch]);

  return <MainPage />;
};

export default ActivateAccountPage;
