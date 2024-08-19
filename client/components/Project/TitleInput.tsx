"use client";
import { useUpdateProjectMutation } from "@/lib/store/slices/apiSlice";
import {
  faCircleCheck,
  faFloppyDisk,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useRef, useState } from "react";
import ErrorPopup from "../ErrorPopup";

type Props = {
  name: string;
  id: string;
  isEmployee: boolean;
};

function TitleInput({ name, id, isEmployee }: Props) {
  const [updateProject] = useUpdateProjectMutation();
  const [title, setTitle] = useState(name);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [titleStatus, setTitleStatus] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleStatus("LOADING");
    const updatedTitle = e.target.value;
    setTitle(updatedTitle);

    if (timeoutRef) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        await updateProject({
          id,
          project: { title: updatedTitle },
        }).unwrap();
        setTitleStatus("SAVED");
      } catch {
        setTitleStatus("ERROR");
      }
    }, 1500);
  };

  if (isEmployee) return <h3 className="text-lg pr-5">{title}</h3>;

  return (
    <div className="w-52 flex items-center gap-2">
      <input
        value={title}
        onChange={handleInput}
        className="bg-slate-300 w-20 px-1 grow border-b border-slate-400 duration-200 text-lg outline-none focus:border-slate-600"
      />
      {titleStatus === "LOADING" ? (
        <span className="text-slate-600 animate-spin">
          <FontAwesomeIcon icon={faSpinner} size="lg" />
        </span>
      ) : titleStatus === "SAVED" ? (
        <FontAwesomeIcon
          className="text-blue-500"
          size="lg"
          icon={faCircleCheck}
        />
      ) : titleStatus === "ERROR" ? (
        <FontAwesomeIcon className="text-red-600" size="lg" icon={faXmark} />
      ) : null}
    </div>
  );
}

export default TitleInput;
