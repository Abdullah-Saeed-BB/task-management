"use client";
import { useUpdateProjectMutation } from "@/lib/store/slices/apiSlice";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ErrorPopup from "../ErrorPopup";

type Props = {
  name: string;
  id: string;
  isEmployee: boolean;
};

function TitleInput({ name, id, isEmployee }: Props) {
  const [error, setError] = useState<null | string>(null);
  const [updateProject] = useUpdateProjectMutation();
  const [title, setTitle] = useState(name);
  const oldTitle = useRef(name);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleApply = async () => {
    try {
      await updateProject({ id, project: { title } }).unwrap();
      oldTitle.current = title;
    } catch (err: any) {
      setError(err.data);
    }
  };

  if (isEmployee) return <h3 className="text-lg pr-5">{title}</h3>;

  return (
    <div className="w-52 flex items-center gap-2">
      <input
        value={title}
        onChange={handleInput}
        className="bg-slate-300 w-20 px-1 grow border-b border-slate-400 duration-200 text-lg outline-none focus:border-slate-600"
      />
      <button
        className={`text-2xl duration-200 text-slate-700 ${
          title == oldTitle.current ? "invisible opacity-0" : "opacity-100"
        }`}
        onClick={handleApply}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
    </div>
  );
}

export default TitleInput;
