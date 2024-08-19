"use client";
import {
  CancelButton,
  CreateButton,
} from "@/components/CreateForm/FormButtons";
import CreateInput from "@/components/CreateForm/Input";
import Select from "@/components/CreateForm/Select";
import ErrorPopup from "@/components/ErrorPopup";
import { useCreateUserMutation } from "@/lib/store/slices/apiSlice";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";

function CreateUser() {
  const [createUser] = useCreateUserMutation();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [showPassword, setShowPassword] = useState("password");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleShowPassword = (e: FormEvent) => {
    e.preventDefault();

    if (showPassword === "text") setShowPassword("password");
    else setShowPassword("text");
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);

    try {
      await createUser(formData).unwrap();

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "employee",
      });
    } catch (err: any) {
      setError(err.data);
    }
    setIsDisabled(false);
  };

  return (
    <div>
      {error ? (
        <ErrorPopup message={error} onClose={() => setError(null)} />
      ) : (
        <></>
      )}
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <form onSubmit={handleSubmit}>
        <CreateInput
          type="text"
          name="name"
          label="Name"
          onChange={handleChange}
          value={formData.name}
        />
        <CreateInput
          type="text"
          name="email"
          label="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <div className="flex gap-2 items-center">
          <CreateInput
            type={showPassword}
            name="password"
            label="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <button
            type="button"
            className="mt-3 w-10 text-slate-600"
            onClick={handleShowPassword}
          >
            <FontAwesomeIcon
              icon={showPassword === "text" ? faEye : faEyeSlash}
              size="lg"
            />
          </button>
        </div>
        <Select
          name="role"
          label="Role"
          value={formData.role}
          onChange={handleChange}
          options={[
            { value: "employee", label: "Employee" },
            { value: "manager", label: "Manager" },
          ]}
        />
        <div className="flex justify-end space-x-2">
          <CancelButton href="/users" />
          <CreateButton disabled={isDisabled} />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
