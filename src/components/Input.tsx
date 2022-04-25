import { HTMLInputTypeAttribute } from "react";
import Label from "./Label";

type inputProps = {
  value: number;
  setValue: Function;
  type: HTMLInputTypeAttribute
  min: number;
  max: number;
  label: string;
}
const Input = ({ value, setValue, type, min, max, label }: inputProps) => {
  return (
    <>
      <Label label={`${label} (${value})`} />
      <input id={`${label} (${value})`} className="text-blue-500" type={type} min={min} max={max} value={value} onChange={(e) => setValue(parseInt(e.target.value))} />
    </>
  )
}

export default Input
