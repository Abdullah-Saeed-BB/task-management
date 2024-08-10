"use client";
import ErrorPopup from "@/components/ErrorPopup";
import Loading from "@/components/Loading";
import {
  useDeleteTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "@/lib/store/slices/apiSlice";
import { useUserPermissions } from "@/lib/useUserPermissions";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleCheck,
  faCircleNotch,
  faCircleXmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "boring-avatars";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

function TaskPage({ params }: { params: Params }) {
  const { taskId } = params;
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const user = useUserPermissions();

  // RTK
  const { data, isLoading, isError } = useGetTaskQuery(taskId);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  // Notes
  const [notes, setNotes] = useState<string | null>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const [notesUpdate, setNotesUpdate] = useState("");

  const handleDelete = async () => {
    try {
      await deleteTask(taskId).unwrap();

      router.push(`/projects/${data?.project.id}`);
    } catch (err: any) {
      console.log(err);
      setError(err.data);
    }
  };

  const handleNotes = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    if (timeout) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(async () => {
      try {
        await updateTask({ id: taskId, task: { notes: newNotes } }).unwrap();
        setNotesUpdate("SAVED");
      } catch {
        setNotesUpdate("ERROR");
      }
    }, 2000);
    setNotesUpdate("LOADING");
    setNotes(newNotes);
  };

  if (isLoading)
    return (
      <div className="mt-24">
        <Loading />
      </div>
    );
  if (isError) return <p>Error load task data</p>;

  if (data) {
    if (!notes && typeof notes !== "string") {
      setNotes(data.notes);
    }

    const statusColor = () => {
      switch (data.status) {
        case "STUCK":
          return "bg-red-200";
        case "WORKING_ON":
          return "bg-amber-200";
        case "DONE":
          return "bg-green-200";
      }
    };

    return (
      <div className="py-6 px-8 max-w-4xl m-auto">
        {error ? (
          <ErrorPopup message={error} onClose={() => setError(null)} />
        ) : null}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold line-clamp-1">{data.title}</h2>
          {!user.isEmployee && (
            <div className="flex gap-3">
              <Link href={`/task/${taskId}/edit`} className="text-xl">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
              <button
                onClick={handleDelete}
                className="text-xl text-red-500 hover:text-red-600 duration-100"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>
        <p className="mb-8">{data.description}</p>
        <table className="table-auto min-w-96 mb-5">
          <tbody className="*:h-11">
            <tr>
              <td className="text-slate-500">Status</td>
              <td>
                <span className={"capitalize px-2 rounded-xl " + statusColor()}>
                  {data.status.toLowerCase().replace("_", " ")}
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-slate-500">Assigned To</td>
              <td>
                <Link
                  href={`/user/${data.assignedToId}`}
                  className="flex items-center mt-1 gap-2"
                >
                  <Avatar name={data.assignedToId} variant="beam" size="2rem" />
                  <h4>{data.assignedTo.name}</h4>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="text-slate-500">Due Date</td>
              <td>
                {new Date(data.dueDate).toLocaleDateString("en", {
                  dateStyle: "medium",
                })}
              </td>
            </tr>
            <tr>
              <td className="text-slate-500">Project</td>
              <td>{data.project.title}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex gap-2">
          <h2 className="font-bold">Notes:</h2>
          {notesUpdate ? (
            notesUpdate === "LOADING" ? (
              <span>
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className="animate-spin text-slate-600"
                />
              </span>
            ) : notesUpdate === "ERROR" ? (
              <span className="text-red-500">
                <FontAwesomeIcon icon={faCircleXmark} />
              </span>
            ) : (
              <span className="text-green-400">
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
            )
          ) : null}
        </div>
        {typeof notes == "string" ? (
          <textarea
            value={notes}
            onChange={handleNotes}
            className="w-full rounded-xl py-1 px-2 border border-slate-200"
          ></textarea>
        ) : null}

        {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
      </div>
    );
  }
}

export default TaskPage;
