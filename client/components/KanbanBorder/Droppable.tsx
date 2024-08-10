"use client";
import { useDroppable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorPopup from "../ErrorPopup";

type Props = {
  children: JSX.Element | JSX.Element[];
  id: string;
  bgColor: string;
  projectId: string;
  canCreate: boolean;
};

export default function Droppable({
  children,
  id,
  bgColor,
  projectId,
  canCreate,
}: Props) {
  const route = useRouter();
  const [error, setError] = useState<null | string>(null);
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    backgroundColor: isOver ? "#cbd5e1" : undefined,
  };

  const handleNavigate = () => {
    // href={`/projects/${projectId}/create-task?status=${id}`}
    if (canCreate) {
      route.push(`/projects/${projectId}/create-task?status=${id}`);
    } else {
      setError(
        "You have to assign users to the project before creating any task"
      );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="min-w-72 w-full duration-100 min-h-32 rounded-xl bg-slate-200 flex flex-col justify-between"
    >
      {error ? (
        <ErrorPopup message={error} onClose={() => setError(null)} />
      ) : null}
      <div>
        <h2 className={"text-center p-3 rounded-t-xl " + bgColor}>
          {id.replace("_", " ")}
        </h2>
        <div className="p-3">{children}</div>
      </div>
      <div className="w-full text-center pb-3 text-slate-700">
        <button onClick={handleNavigate}>Add task +</button>
      </div>
    </div>
  );
}
