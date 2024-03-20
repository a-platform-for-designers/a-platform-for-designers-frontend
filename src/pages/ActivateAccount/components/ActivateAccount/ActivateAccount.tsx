import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const ResetPasswordPopUp: FC = () => {
  const { uid, token } = useParams();
  const dispatch = useAppDispatch();
  const { errorMessages, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const hasError = !!errorMessages.length;
  const isLoading = loading === "pending";

  useEffect(() => {
    await dispatch(
      activation({ uid, token })
    );
  }, []);


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

  return null;
};

export default ResetPasswordPopUp;
