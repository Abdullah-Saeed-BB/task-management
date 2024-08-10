"use client";
import {
  CancelButton,
  CreateButton,
} from "@/components/CreateForm/FormButtons";
import CreateInput from "@/components/CreateForm/Input";
import Select from "@/components/CreateForm/Select";
import Textarea from "@/components/CreateForm/Textarea";
import ErrorPopup from "@/components/ErrorPopup";
import Loading from "@/components/Loading";
import {
  useCreateTaskMutation,
  useGetProjectsUsersQuery,
} from "@/lib/store/slices/apiSlice";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

function CreateTask({ params }: { params: Params }) {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const { projectId } = params;
  const [error, setError] = useState(null);
  const [createTask] = useCreateTaskMutation();
  const { data, isLoading, isError } = useGetProjectsUsersQuery(projectId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notes: "",
    status: status ? status : "STUCK",
    dueDate: new Date().toISOString(),
    assignedToId: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      await createTask({
        ...formData,
        dueDate: new Date(formData.dueDate),
        projectId,
      }).unwrap();

      setFormData({
        title: "",
        description: "",
        notes: "",
        status: formData.status,
        dueDate: formData.dueDate,
        assignedToId: "",
      });
    } catch (err: any) {
      setError(err.data);
    }
  };

  return (
    <div className="px-10 py-5 space-y-5 mx-auto max-w-4xl">
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
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
          required={false}
        />
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <span>Error load project&#39;s users</span>
        ) : data ? (
          <Select
            label="Assigned to"
            name="assignedToId"
            onChange={handleChange}
            value={formData.assignedToId}
            options={data.users.map((user) => ({
              label: user.name,
              value: user.id,
            }))}
          />
        ) : null}

        <Select
          label="Status"
          value={formData.status}
          name="status"
          onChange={handleChange}
          options={[
            { value: "STUCK", label: "Stuck" },
            { value: "WORKING_ON", label: "Wroking on" },
            { value: "DONE", label: "Done" },
          ]}
        />

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate.split("T")[0]}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          className="border rounded-md p-1 border-slate-200"
        />

        <div className="flex justify-end space-x-2">
          <CancelButton href={`/projects/${projectId}`} />
          <CreateButton />
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
