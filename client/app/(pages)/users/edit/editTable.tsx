"use client";
import ErrorPopup from "@/components/ErrorPopup";
import { useUpdateUserMutation } from "@/lib/store/slices/apiSlice";
import { User } from "@/lib/type";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

function EditTable({ user }: { user: User }) {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
  });
  const [updateMessage, setUpdateMessage] = useState("Apply");
  const [updateUser] = useUpdateUserMutation();
  const [showPassword, setShowPassword] = useState("password");

  const handleShowPassword = (e: FormEvent) => {
    e.preventDefault();

    if (showPassword === "text") setShowPassword("password");
    else setShowPassword("text");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleApply = async () => {
    setUpdateMessage("...");
    try {
      await updateUser({ id: user.id, user: formData }).unwrap();

      setUpdateMessage("Saved");
    } catch (err: any) {
      setError(err.data);

      setUpdateMessage("Apply");
    }
  };

  return (
    <div>
      <div>
        {error ? (
          <ErrorPopup message={error} onClose={() => setError(null)} />
        ) : null}
        <div className="grid gap-5 grid-flow-row grid-cols-5">
          <p className="text-slate-500">Name</p>
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="w-full border-b col-span-4"
          />
          <p className="text-slate-500">Email</p>
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full border-b col-span-4"
          />
          <p className="text-slate-500">Password</p>
          <div className="col-span-4 flex gap-4">
            <input
              name="password"
              onChange={handleChange}
              value={formData.password}
              type={showPassword}
              className="w-full border-b col-span-4"
            />
            <button onClick={handleShowPassword}>
              <FontAwesomeIcon
                icon={showPassword === "text" ? faEye : faEyeSlash}
                className="text-slate-600 text-xl"
              />
            </button>
          </div>
          <Link
            href={`./`}
            className="py-1 md:w-20 w-16 text-center rounded-md border border-slate-500 text-slate-500"
          >
            Cancel
          </Link>
          <button
            onClick={handleApply}
            className="py-1 w-20 bg-slate-300 rounded-md duration-100 hover:bg-slate-400"
          >
            {updateMessage}
          </button>
        </div>
      </div>
      {/* <pre>{JSON.stringify(formData, undefined, 2)}</pre> */}
    </div>
  );
}

export default EditTable;
