"use client";
import { useUpdateProjectMutation } from "@/lib/store/slices/apiSlice";
import { useEffect, useRef, useState } from "react";

type Props = {
  color: string;
  projectId: string;
  isEmployee: boolean;
};

const colors: string[] = [
  "#f59e0b",
  "#facc15",
  "#84cc16",
  "#4ade80",
  "#2dd4bf",
  "#38bdf8",
  "#3b82f6",
  "#8b5cf6",
  "#c084fc",
  "#d946ef",
];

function ColorPicker({ color, projectId, isEmployee }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [updateProject] = useUpdateProjectMutation();

  const handleChangeColor = async (color: string) => {
    try {
      await updateProject({ id: projectId, project: { color } });
    } catch {}
  };

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (isEmployee)
    return (
      <span
        style={{ backgroundColor: color }}
        className="size-7 border-2 rounded-md border-slate-300 drop-shadow-md "
      ></span>
    );
  return (
    <div className="relative" ref={popupRef}>
      <button
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
        className={`size-7 duration-100 rounded-md border-slate-300 outline outline-1 outline-slate-100 ${
          isOpen ? "border-4" : "border-2"
        }`}
      ></button>
      {isOpen && (
        <ul className="z-50 absolute mt-1 drop-shadow-md rounded-md bg-slate-100 flex w-24 flex-wrap gap-2 p-2 justify-between items-center">
          {colors.map((color, i) => (
            <li key={i}>
              <button
                onClick={() => handleChangeColor(color)}
                style={{ backgroundColor: color }}
                className="size-5 rounded-sm border border-slate-100 outline outline-1 outline-slate-300 drop-shadow-md"
              ></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ColorPicker;
