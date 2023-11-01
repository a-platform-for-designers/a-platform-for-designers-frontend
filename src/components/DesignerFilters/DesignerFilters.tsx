import { useState } from "react";
import MyCheckBox from "../UI/MyCheckBox/MyCheckBox";
import "./DesignerFilters.scss";

import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const DesignerFilters: React.FC = () => {
  const [speciality, setSpeciality] = useState<boolean>(false);

  return (
    <div className="designerFilters">
      <div>
        <h2 className="designerFilters__title">Специализация</h2>
        <MyCheckBox
          labelPlacement="end"
          checked={speciality}
          label="Графические дизайнеры"
          onChange={() => {
            setSpeciality((prev) => !prev);
          }}
        />
      </div>

      <div>
        <h2 className="designerFilters__title">Готовность к работе</h2>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="ready-to-job"
        >
          <FormControlLabel value="Все" control={<Radio />} label="Female" />
          <FormControlLabel
            value="Ищут заказы"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value="Не ищут заказы"
            control={<Radio />}
            label="Other"
          />
        </RadioGroup>
      </div>

      <div>
        <h2 className="designerFilters__title">Готовность к работе</h2>
      </div>
    </div>
  );
};

export default DesignerFilters;
