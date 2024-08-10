"use client";
import {
  CancelButton,
  CreateButton,
} from "@/components/CreateForm/FormButtons";
import CreateInput from "@/components/CreateForm/Input";
import Select from "@/components/CreateForm/Select";
import ErrorPopup from "@/components/ErrorPopup";
import { useCreateUserMutation } from "@/lib/store/slices/apiSlice";
import { ChangeEvent, FormEvent, useState } from "react";

const CreateUser = () => {
  const [createUser] = useCreateUserMutation();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

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
  };

  return (
    <div className="px-10 py-5 space-y-5 mx-auto max-w-4xl">
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
          type="email"
          name="email"
          label="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <CreateInput
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
          value={formData.password}
        />
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
          <CreateButton />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
