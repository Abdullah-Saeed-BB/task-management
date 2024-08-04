/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/lib/type";
import Avatar from "boring-avatars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faEye, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
  task: Task;
};

export default function Draggable({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.7 : 1,
  };

  const dueDateTask = new Date(task.dueDate);

  const DueDateDays = useMemo(() => {
    return (dueDateTask.getTime() - new Date().getTime()) / 8.64e7;
  }, []);

  return (
    <div
      style={style}
      className="p-3 drop-shadow my-1 max-w-64 w-full bg-white rounded-md text-start space-y-4"
    >
      <div className="flex justify-between gap-1">
        <div>
          <h2 className="font-bold line-clamp-2">{task.title}</h2>
          <p className="text-sm line-clamp-1">{task.description}</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-600">
          <button ref={setNodeRef} {...listeners} {...attributes}>
            <FontAwesomeIcon icon={faGripVertical} className="size-5" />
          </button>
          <Link href={`/task/${task.id}`}>
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <Link
          href={`/user/${task.assignedToId}`}
          className="flex gap-1 bg-slate-200 items-center py-2 pr-2 rounded-full h-6 w-fit"
        >
          <Avatar name={task.assignedToId} variant="beam" size="2.25em" />
          <p>{task.assignedTo.name}</p>
        </Link>
        <div
          className={
            (DueDateDays > 3
              ? "text-green-500"
              : DueDateDays > 0
              ? "text-yellow-600"
              : "text-red-500") + " space-x-1"
          }
        >
          <FontAwesomeIcon icon={faClock} />
          <span>
            {dueDateTask.toLocaleDateString("en", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
