import { ChangeEvent, ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type Props<T> = {
  name: string;
  label?: string;
  type: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: T;
  required?: boolean;
};

function Input<T extends string | number>({
  name,
  label,
  type,
  onChange,
  value,
  required = true,
}: Props<T>) {
  return (
    <div className="mb-5 w-full">
      {label && (
        <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1 border rounded-md"
        required={required}
      />
    </div>
  );
}

export default Input;
