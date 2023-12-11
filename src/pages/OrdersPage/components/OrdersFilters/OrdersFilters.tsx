import "./OrdersFilters.scss";
import { SyntheticEvent, useState } from "react";
import { MyCheckBox, MyMultipleDropDown } from "@/shared/UI";
import { IOrdersList } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";

interface IProps {
  orders?: IOrdersList[];
}

const OrdersFilters: React.FC<IProps> = ({ orders }) => {
  const [speciality, setSpeciality] = useState<string[]>([]);
  const [sphereValue, setSphereValue] = useState<string[]>([]);

  const { spheres } = useAppSelector((state) => state.data);
  const { specializations } = useAppSelector((state) => state.data);

  const specializationsList = Object.keys(specializations);

  function handleSpeciality(item: string) {
    const newValue = speciality.includes(item)
      ? speciality.filter((elem) => elem !== item)
      : [...speciality, item];
    setSpeciality(newValue);
  }
  console.log(orders);

  function handleSetSphere(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setSphereValue(newValue);
  }

  return (
    <div className="ordersFilters">
      <div className="ordersFilters__container">
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
          placeholder="Выбирите сферу"
        />
      </div>
    </div>
  );
};

export default OrdersFilters;
