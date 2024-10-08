"use client";
import { useCreateProjectMutation } from "@/lib/store/slices/apiSlice";
import { faPlus, faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

function CreateProject() {
  const [addProject] = useCreateProjectMutation();
  const [isCreate, setIsCreate] = useState(false);
  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);

    await addProject({ title: input });

    setIsDisabled(false);
    setIsCreate(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (isCreate) {
      inputRef.current?.focus();
    }
  }, [isCreate]);

  if (isCreate) {
    return (
      <form onSubmit={handleCreate} className="flex">
        <input
          name="title"
          type="text"
          onChange={handleInputChange}
          disabled={isDisabled}
          value={input}
          ref={inputRef}
          className="shadow border rounded w-full px-1 text-slate-700 bg-slate-50 focus:outline-none focus:shadow-outline disabled:bg-slate-300"
          required
        />
        <button
          type="button"
          className="text-xl px-2"
          onClick={() => setIsCreate(false)}
        >
          <FontAwesomeIcon icon={faXmarkSquare} />
        </button>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsCreate(true)}
      className="flex items-center mb-4 gap-2 text-slate-500"
    >
      <FontAwesomeIcon icon={faPlus} className="size-5" />
      <span>Add project</span>
    </button>
  );
}

export default CreateProject;
