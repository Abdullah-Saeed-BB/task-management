"use client";

import { apiSlice } from "@/lib/store/slices/apiSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Logo from "../logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const [showPassword, setShowPassword] = useState("password");

  const handlePassword = () => {
    if (showPassword === "text") {
      setShowPassword("password");
    } else {
      setShowPassword("text");
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(false);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.status !== 200) {
      setError(true);
    } else {
      dispatch(apiSlice.util.resetApiState());
      router.replace("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-96 pt-5 pb-7 px-8 flex flex-col items-center bg-slate-50 rounded-xl drop-shadow-lg"
    >
      <Image alt="task management logo" src={Logo} height={55} width={55} />
      <h2 className="text-2xl text-slate-600 font-bold mt-3">
        Welcome to{" "}
        <span className="tracking-wider text-slate-800">TaskMaster</span>
      </h2>
      <div className="mt-10 space-y-5 w-full">
        <input
          className={
            "bg-slate-50 border-b w-full px-1 pt-2 pb-1 duration-100 outline-none focus:text-slate-700 focus:border-slate-300 " +
            (error ? "text-red-700 border-red-300" : "border-slate-200")
          }
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="w-full flex items-end gap-2">
          <input
            className={
              "bg-slate-50 border-b w-full px-1 pt-2 pb-1 duration-100 outline-none focus:text-slate-700 focus:border-slate-300 " +
              (error ? "text-red-700 border-red-300" : "border-slate-200")
            }
            type={showPassword}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handlePassword}
            className="text-slate-500"
          >
            <FontAwesomeIcon
              icon={showPassword === "text" ? faEye : faEyeSlash}
            />
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 drop-shadow-md text-white bg-blue-400 py-2 px-20 rounded-full duration-200 hover:bg-blue-500"
      >
        LOGIN
      </button>
      <p className="text-slate-400 text-sm text-center mt-8">
        You could use <b>admin</b>, as email and password.
      </p>
    </form>
  );
}

export default LoginPage;
