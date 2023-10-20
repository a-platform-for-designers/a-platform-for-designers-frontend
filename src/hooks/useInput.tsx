import { useState } from "react";
import useValidation, { IValidation } from "./useValidation";

interface IConfig {
  trim?: boolean;
}

function useInput(
  initialValue: string,
  validations: IValidation,
  config: IConfig = {}
) {
  const [value, setValue] = useState(initialValue || "");
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value || "", validations);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    if (config.trim) {
      setValue(value.trim());
    }
    setDirty(true);
  };

  const onSetValue = (val: string) => {
    setValue(val);
  };

  const clear = () => {
    setDirty(false);
    setValue("");
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    onSetValue,
    clear,
    ...valid,
  };
}

export type objFromUseInput = ReturnType<typeof useInput>;

export default useInput;
