"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/logo.png";

export default function Error() {
  return (
    <div className="my-10 px-4 text-center text-slate-500">
      <Link
        href="/"
        className="flex tracking-widest mb-12 justify-center items-center gap-2 text-slate-700 text-2xl font-semibold"
      >
        <Image
          alt="Task management application logo"
          src={Logo}
          className="size-10"
        />
        <h2>TaskMaster</h2>
      </Link>
      <h3 className="text-3xl text-slate-700 mb-3">
        Sorry, Page you looking for not exist
      </h3>
      <Link href="/" className="text-xl text-blue-500 underline">
        Return Home
      </Link>
    </div>
  );
}
