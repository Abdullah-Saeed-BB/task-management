"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

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
      const data = await res.json();

      router.replace("/");
    }
  };

  return (
    <div className="w-screen bg-slate-200 h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="size-96 py-5 px-8 flex flex-col items-center bg-slate-50 rounded-xl drop-shadow-lg"
      >
        <h2 className="text-3xl text-slate-700 font-bold mt-5">Log in</h2>
        <div className="mt-10 space-y-5">
          <input
            className={
              "bg-slate-50 border-b w-full px-1 pt-2 pb-1 duration-100 outline-none focus:text-slate-700 focus:border-slate-300 " +
              (error ? "text-red-700 border-red-300" : "border-slate-200")
            }
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className={
              "bg-slate-50 border-b w-full px-1 pt-2 pb-1 duration-100 outline-none focus:text-slate-700 focus:border-slate-300 " +
              (error ? "text-red-700 border-red-300" : "border-slate-200")
            }
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="mt-12 drop-shadow-md text-white bg-blue-400 py-2 px-20 rounded-full duration-200 hover:bg-blue-500">
          LOGIN
        </button>
        <p className="text-slate-400 text-sm text-center mt-5">
          You could use <b>admin</b>, as email and password.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
