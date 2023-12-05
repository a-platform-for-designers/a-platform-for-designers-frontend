import "./OrdersFilters.scss";
import { SyntheticEvent, useState } from "react";
import { MyCheckBox, MyMultipleDropDown } from "@/shared/UI";
import { LISTS } from "@/constants/constants";

const OrdersFilters: React.FC = () => {
  const [speciality, setSpeciality] = useState<string[]>([]);
  const [sphere, setSphere] = useState<string[]>([]);

  function handleSpeciality(item: string) {
    const newValue = speciality.includes(item)
      ? speciality.filter((elem) => elem !== item)
      : [...speciality, item];
    setSpeciality(newValue);
  }

  function handleSetSkills(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setSphere(newValue);
  }

  return (
    <div className="ordersFilters">
      <div className="ordersFilters__container">
        <h2 className="ordersFilters__title">Специализация</h2>
        {LISTS.LIST_SPECIALITY.map((item, i) => {
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
          options={LISTS.LIST_SPHERE}
          value={sphere}
          onChange={handleSetSkills}
          className="ordersFilters__dropdown"
        />
      </div>
    </div>
  );
};

export default OrdersFilters;
