"use client";
import { useDroppable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorPopup from "../ErrorPopup";
import { useUserPermissions } from "@/lib/useUserPermissions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children: JSX.Element | JSX.Element[];
  id: string;
  icon: IconDefinition;
  projectId: string;
  canCreate: boolean;
};

export default function Droppable({
  children,
  id,
  icon,
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
  const user = useUserPermissions();

  const handleNavigate = () => {
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
      className="min-w-72 w-full duration-100 min-h-32 rounded-sm bg-slate-200 flex flex-col justify-between"
    >
      {error ? (
        <ErrorPopup message={error} onClose={() => setError(null)} />
      ) : null}
      <div>
        <div className="px-3 pt-3 space-x-3 text-slate-600">
          <FontAwesomeIcon icon={icon} size="lg" />
          <span className="text-center rounded-t-xl capitalize">
            {id.replace("_", " ").toLowerCase()}
          </span>
        </div>
        <div className="px-2 py-3">{children}</div>
      </div>
      {!user.isEmployee && (
        <div className="w-full px-4 text-center pb-3 text-slate-700 focus:opacity-70">
          <button onClick={handleNavigate}>+ Add task</button>
        </div>
      )}
    </div>
  );
}
