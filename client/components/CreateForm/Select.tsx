import { ChangeEventHandler } from "react";

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: { label: string; value: string }[];
};

function Select({ name, label, value, onChange, options }: Props) {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1 border rounded-md"
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
