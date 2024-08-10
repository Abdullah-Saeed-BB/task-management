"use client";

import ErrorPopup from "@/components/ErrorPopup";
import Loading from "@/components/Loading";
import {
  useGetProjectsUsersQuery,
  useUpdateTaskMutation,
} from "@/lib/store/slices/apiSlice";
import { Task } from "@/lib/type";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

function EditTable({ task }: { task: Task }) {
  const [error, setError] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState("Apply");
  const {
    data: projectsUsers,
    isLoading,
    isError,
  } = useGetProjectsUsersQuery(task.project.id);
  const [updateTask] = useUpdateTaskMutation();

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    assignedToId: task.assignedToId,
    dueDate: task.dueDate.split("T")[0],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApply = async () => {
    setUpdateMessage("...");
    console.log(formData);

    try {
      await updateTask({
        id: task.id,
        task: { ...formData, dueDate: new Date(formData.dueDate) },
      }).unwrap();

      setUpdateMessage("Saved");
    } catch (err: any) {
      setError(err.data);
      setUpdateMessage("Apply");
    }
  };

  return (
    <div className="py-6 px-8 max-w-4xl m-auto">
      {error ? (
        <ErrorPopup message={error} onClose={() => setError(null)} />
      ) : null}
      <div>
        <table>
          <tbody className="*:h-11">
            <tr>
              <td className="text-slate-500">Title</td>
              <td>
                <input
                  className="w-full border-b"
                  onChange={handleChange}
                  name="title"
                  value={formData.title}
                />
              </td>
            </tr>
            <tr>
              <td className="text-slate-500 pr-5">Description</td>
              <td className="w-full">
                <input
                  className="w-full border-b"
                  onChange={handleChange}
                  name="description"
                  value={formData.description}
                />
              </td>
            </tr>
            <tr>
              <td className="text-slate-500">Status</td>
              <td>
                <select
                  className="w-full border-b"
                  onChange={handleChange}
                  name="status"
                  value={formData.status}
                >
                  <option value="STUCK">Stuck</option>
                  <option value="WORKING_ON">Working On</option>
                  <option value="DONE">Done</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-slate-500">Assigned To</td>
              <td>
                {isLoading ? (
                  <Loading />
                ) : isError ? (
                  <p>Can&#39;t provide project&#39;s users</p>
                ) : projectsUsers ? (
                  <select
                    className="w-full border-b"
                    onChange={handleChange}
                    name="assignedToId"
                    value={formData.assignedToId}
                  >
                    {projectsUsers.users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="text-slate-500">Due Date</td>
              <td>
                <input
                  type="date"
                  className=" border-b"
                  onChange={handleChange}
                  name="dueDate"
                  value={formData.dueDate}
                  min={new Date().toISOString().split("T")[0]}
                />
              </td>
            </tr>
            <tr className="*:pt-6">
              <td>
                <Link
                  href={`./`}
                  className="py-1 px-4 rounded-md border border-slate-500 text-slate-500"
                >
                  Cancel
                </Link>
              </td>
              <td>
                <button
                  onClick={handleApply}
                  className="py-1 px-2 bg-slate-300 rounded-md duration-100 hover:bg-slate-400"
                >
                  {updateMessage}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <pre>{JSON.stringify(users)}</pre> */}
    </div>
  );
}

export default EditTable;
