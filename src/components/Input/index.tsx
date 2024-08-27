import { ChangeEvent, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  register?: UseFormRegisterReturn;
}

export const Input = ({
  value,
  onChange,
  className = "",
  register,
  ...rest
}: InputProps) => {
  return (
    <input
      className={`float-end border rounded-lg border-gray h-10 pl-4 ${className}`}
      value={value}
      {...(register ? { ...register } : { onChange })}
      {...rest}
    />
  );
};
