import "./OrdersFilters.scss";
import { SyntheticEvent, useState, useCallback } from "react";
import { MyCheckBox, MyMultipleDropDown } from "@/shared/UI";
import { IOrdersList } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { filterService } from "@/api/services/filterService";

interface IProps {
  setOrders: (IOrdersList: IOrdersList[]) => void;
}

const OrdersFilters: React.FC<IProps> = ({ setOrders }) => {
  const [speciality, setSpeciality] = useState<string[]>([]);
  const [sphereValue, setSphereValue] = useState<string[]>([]);

  const { spheres } = useAppSelector((state) => state.data);
  const { specializations } = useAppSelector((state) => state.data);

  const specializationsList = Object.keys(specializations).filter(
    (item) => item !== "Менторство"
  );
  const specialityIds = convertToIds(speciality, specializations);
  const spheresIds = convertToIds(sphereValue, spheres);

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
    setSpeciality(newValue);
    fetchData();
  }
  function handleSetSphere(
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) {
    if (newValue.length > 5) return;
    setSphereValue(newValue);
    fetchData();
  }

  const fetchData = useCallback(async () => {
    const filteredList = await filterService.getQueryOrders(
      spheresIds,
      specialityIds,
      12,
      1
    );
    setOrders(filteredList.results);
  }, [setOrders, spheresIds, specialityIds]);

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
          placeholder="Выберите сферу"
        />
      </div>
    </div>
  );
};

export default OrdersFilters;
