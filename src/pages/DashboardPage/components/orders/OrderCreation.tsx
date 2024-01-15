import useInput from "@/hooks/useInput";
import { IProfileDataItem } from "../../model/types";
import { IOrderInfoResponse } from "@/types";
import "./OrderCreation.scss";
import { Box, Typography } from "@mui/material";
import ProfileInput from "@/shared/UI/ProfileInput/ProfileInput";
import { SyntheticEvent, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { MyButton } from "@/shared/UI";
import { enqueueSnackbar } from "notistack";
import { ordersService } from "@/api";
import { useNavigate } from "react-router-dom";

interface IProps {
  orderInfo?: IOrderInfoResponse;
}

const OrderСreation: React.FC<IProps> = ({ orderInfo }) => {
  const navigate = useNavigate();
  const title = useInput(orderInfo?.title || "", { isEmpty: true });
  const description = useInput(orderInfo?.description || "", { isEmpty: true });
  const payment = useInput(
    orderInfo?.payment?.toString() || "",
    {},
    { trim: true }
  );
  const [directions, setDirections] = useState<string | null>(
    orderInfo?.specialization.name || null
  );
  const [sphereValue, setSphereValue] = useState<string | null>(
    orderInfo?.sphere.name || null
  );
  const { specializations, spheres } = useAppSelector((state) => state.data);

  const specializationsList = Object.keys(specializations).filter(
    (item) => item !== "Менторство"
  );

  payment.onChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    const limitedValue = numericValue.slice(0, 9);
    payment.onSetValue(limitedValue);
  };

  const orderCreationFileds: IProfileDataItem[] = [
    {
      heading: "Название",
      variant: "input",
      placeholder: "Введите название",
      data: title,
      maxLength: 50,
    },
    {
      heading: "Кого ищете",
      variant: "drop-down",
      placeholder: "Выберите профессию из списка",
      options: [...specializationsList],
      value: directions,
      onChange: handleSetDirections,
    },
    {
      heading: "Описание заказа",
      variant: "input",
      placeholder: "Расскажите о задаче и ожидаемых результатах",
      minRows: 5,
      data: description,
      maxLength: 500,
    },
    {
      heading: "Оплата",
      variant: "text-label-without",
      placeholder: "Введите сумму",
      data: payment,
      className: "order-creation__textarea_currency",
    },
    {
      heading: "Сфера",
      variant: "drop-down",
      placeholder: "Добавьте из списка",
      options: [...Object.keys(spheres)],
      value: sphereValue,
      onChange: handleSetSphere,
    },
  ];

  function handleSetDirections(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) {
    setDirections(newValue);
  }

  function handleSetSphere(
    _: SyntheticEvent<Element, Event>,
    newValue: string | null
  ) {
    setSphereValue(newValue);
  }

  const convertStringToId = (
    str: string[] | string | null,
    state: { [key: string]: number }
  ) => {
    if (typeof str === "string") {
      return state[str];
    }

    if (!str) {
      return null;
    }

    const mappedInstruments = str.map((item: string) => {
      return state[item];
    });
    return mappedInstruments;
  };

  async function handleAddSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const values = {
      title: title.value,
      specialization: convertStringToId(directions, specializations),
      description: description.value,
      payment: Number(payment.value),
      sphere: convertStringToId(sphereValue, spheres),
    };
    try {
      const createCase = await ordersService.createOrder(values);
      enqueueSnackbar("Заказ успешно опубликован", { variant: "success" });
      navigate("/my-orders/orders");
      return createCase;
    } catch {
      enqueueSnackbar(
        "Произошла ошибка при создании заказа. Повторите попытку позже",
        {
          variant: "error",
        }
      );
    }
  }

  async function handleEditSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const values = {
      title: title.value,
      specialization: convertStringToId(directions, specializations),
      description: description.value,
      payment: Number(payment.value),
      sphere: convertStringToId(sphereValue, spheres),
    };
    if (orderInfo) {
      try {
        const createCase = await ordersService.editOrder(values, orderInfo.id);
        enqueueSnackbar("Редактирование заказа прошло успешно", {
          variant: "success",
        });
        navigate("/my-orders/orders");
        return createCase;
      } catch {
        enqueueSnackbar(
          "Произошла ошибка при редактировании заказа. Повторите попытку позже",
          {
            variant: "error",
          }
        );
      }
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
        maxWidth: "1440px",
        margin: " 20px auto",
      }}
    >
      <button
        className="order-creation__button"
        onClick={() => window.history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 28"
          fill="none"
        >
          <path
            d="M15.7069 7.41L14.2969 6L8.29688 12L14.2969 18L15.7069 16.59L11.1269 12L15.7069 7.41Z"
            fill="#1D192B"
          />
        </svg>
        Назад
      </button>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "60px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "60px" }}>
            <Typography sx={{ fontWeight: "700", fontSize: "32px" }}>
              {!orderInfo ? "Создание заказа" : "Редактирование заказа"}
            </Typography>
            {orderCreationFileds.map((item) => (
              <ProfileInput key={item.heading} {...item} />
            ))}
          </Box>
          <Box sx={{ width: "212px", margin: "0 auto" }}>
            {orderInfo ? (
              <MyButton
                onClick={handleEditSubmit}
                disabled={!!title.error && !!description.error}
              >
                Опубликовать проект
              </MyButton>
            ) : (
              <MyButton
                onClick={handleAddSubmit}
                disabled={!!title.error && !!description.error}
              >
                Опубликовать проект
              </MyButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderСreation;
