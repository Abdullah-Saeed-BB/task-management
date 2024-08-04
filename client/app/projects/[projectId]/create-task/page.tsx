"use client";
import {
  CancelButton,
  CreateButton,
} from "@/components/CreateForm/FormButtons";
import CreateInput from "@/components/CreateForm/Input";
import Textarea from "@/components/CreateForm/Textarea";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

function CreateTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notes: "",
    status: "STUCK",
    dueDate: new Date(),
    assignedToId: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="px-10 py-5 space-y-5 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <CreateInput
          label="Title"
          name="title"
          type="text"
          onChange={handleChange}
          value={formData.title}
        />
        <Textarea
          label="Description"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
        <Textarea
          label="Notes"
          name="notes"
          onChange={handleChange}
          value={formData.notes}
        />
        <div className="flex justify-end space-x-2">
          <CancelButton href="/" />
          <CreateButton />
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
