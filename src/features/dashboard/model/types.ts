import {
  TOnChangeSingle,
  TOnChangeMylty,
} from "@/components/UI/MyDropDown/MyDropDown";
import { objFromUseInput } from "@/hooks/useInput";

export interface IProfileDataItem {
  heading?: string;
  variant?:
    | "input"
    | "drop-down"
    | "wrapper-photo-upload"
    | "case-photo-upload"
    | "tags";
  placeholder?: string;
  className?: string;
  label?: string;
  description?: string;
  options?: string[];
  minRows?: string | number | undefined;
  data?: objFromUseInput;
  value?: string | null | string[] | File | File[];
  disabled?: boolean;
  onChange?:
    | ((_: React.ChangeEvent<HTMLInputElement>, newValue: File | null) => void)
    | ((_: React.ChangeEvent<HTMLInputElement>, newValue: File) => void)
    | TOnChangeSingle
    | TOnChangeMylty;
  maxLength?: number;
}

export interface IProfileInputProps {
  heading?: string;
  variant?:
    | "input"
    | "drop-down"
    | "wrapper-photo-upload"
    | "case-photo-upload"
    | "tags";
  placeholder?: string;
  className?: string;
  label?: string;
  description?: string;
  options?: string[];
  minRows?: string | number | undefined;
  value?: string | null | string[] | File | File[];
  onChange?:
    | ((_: React.ChangeEvent<HTMLInputElement>, newValue: File | null) => void)
    | ((_: React.ChangeEvent<HTMLInputElement>, newValue: File) => void)
    | TOnChangeSingle
    | TOnChangeMylty;
  data?: objFromUseInput;
  disabled?: boolean;
  handleDeleteCaseImage?: (i: number) => void;
  maxLength?: number;
}
