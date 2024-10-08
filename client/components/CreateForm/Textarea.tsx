import { ChangeEventHandler } from "react";

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  required?: boolean
};

function Textarea({ name, label, value, onChange, required=true }: Props) {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-slate-200 p-1 rounded-md "
        required={required}
      />
    </div>
  );
}

export default Textarea;
