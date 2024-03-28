import { useEffect } from "react";
import { MainPage } from "..";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setCurrentScreen } from "@/redux/slices/authSlice";
import { Screens } from "@/types";

const ResetPasswordPage = () => {
  const { uid, token } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid && token) {
      dispatch(
        setCurrentScreen({
          screen: Screens.ConfirmPassword,
          extraData: { uid, token },
        })
      );
    }
  }, [uid, token, dispatch]);

  return <MainPage />;
};

export default ResetPasswordPage;
