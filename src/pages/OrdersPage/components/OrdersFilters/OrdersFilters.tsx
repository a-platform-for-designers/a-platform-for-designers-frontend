import "./OrdersFilters.scss";
import { SyntheticEvent, useState, useEffect } from "react";
import { MyCheckBox, MyMultipleDropDown, MyButton } from "@/shared/UI";
import { IOrdersList } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { filterService } from "@/api/services/filterService";
import CloseIcon from "@mui/icons-material/Close";
import { DESIGNER_FILTERS_CLEAR_BTN_LABEL } from "../../../DesignersPage/model/constants";

interface IProps {
  setOrders: (IOrdersList: IOrdersList[]) => void;
  orders: IOrdersList[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setTotalOrders: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

const OrdersFilters: React.FC<IProps> = ({
  setOrders,
  orders,
  setPage,
  page,
  setTotalOrders,
  limit,
}) => {
  const [speciality, setSpeciality] = useState<string[]>([]);
  const [sphereValue, setSphereValue] = useState<string[]>([]);
  const { spheres } = useAppSelector((state) => state.data);
  const { specializations } = useAppSelector((state) => state.data);
  const specializationsList = Object.keys(specializations).filter(
    (item) => item !== "Менторство"
  );

  function convertToIds(
    names: string[],
    specializations: Record<string, number>
  ): number[] {
    const idValues: number[] = [];
    names.forEach((name) => {
      const id = specializations[name];
      if (id) {
        idValues.push(id);
      }
    });
    return idValues;
  }

  function handleSpeciality(item: string) {
    const newValue = speciality.includes(item)
      ? speciality.filter((elem) => elem !== item)
      : [...speciality, item];
    setPage(1);
    setSpeciality(newValue);
  }
  function handleSetSphere(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setPage(1);
    setSphereValue(newValue);
  }

  useEffect(() => {
    const specialityIds = convertToIds(speciality, specializations);
    const spheresIds = convertToIds(sphereValue, spheres);

    (async () => {
      const filteredList = await filterService.getQueryOrders(
        spheresIds,
        specialityIds,
        limit,
        page
      );
      setOrders(filteredList.results);
      setTotalOrders(filteredList.count);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speciality, sphereValue, page]);

  function handleClearFilters() {
    setSpeciality([]);
    setSphereValue([]);
    setOrders(orders);
  }

  return (
    <div className="ordersFilters">
      <div className="ordersFilters__container">
        <MyButton
          onClick={handleClearFilters}
          disabled={speciality.length === 0 && sphereValue.length === 0}
          className="designerFilters__button"
          type="button"
          variant="text"
          startIcon={<CloseIcon />}
        >
          {DESIGNER_FILTERS_CLEAR_BTN_LABEL}
        </MyButton>

        <h2 className="ordersFilters__title">Специализация</h2>
        {specializationsList.map((item, i) => {
          return (
            <MyCheckBox
              key={i}
              className="ordersFilters__checkbox"
              labelPlacement="start"
              checked={speciality.includes(item)}
              label={item}
              onChange={() => {
                handleSpeciality(item);
              }}
            />
          );
        })}
      </div>

      <div className="ordersFilters__container">
        <h2 className="ordersFilters__title">Сфера</h2>
        <MyMultipleDropDown
          options={Object.keys(spheres)}
          value={sphereValue}
          onChange={handleSetSphere}
          className="ordersFilters__dropdown"
          placeholder="Выберите сферу"
        />
      </div>
    </div>
  );
};

export default OrdersFilters;
