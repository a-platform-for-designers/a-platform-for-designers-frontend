import { useState } from "react";
import useValidation, { IValidation } from "./useValidation";

function useInput(initialValue: string, validations: IValidation) {
  const [value, setValue] = useState(initialValue || "");
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value || "", validations);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setValue((prev) => prev.trim());
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

export default useInput;
