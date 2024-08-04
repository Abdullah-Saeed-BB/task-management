"use client";
import { useDroppable } from "@dnd-kit/core";
import Link from "next/link";

type Props = {
  children: JSX.Element | JSX.Element[];
  id: string;
  bgColor: string;
  projectId: string;
};

export default function Droppable({ children, id, bgColor, projectId }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    backgroundColor: isOver ? "#e2e8f0" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="min-w-72 duration-100 min-h-32 rounded-xl bg-slate-100 flex flex-col justify-between"
    >
      <div>
        <h2 className={"text-center p-3 rounded-t-xl " + bgColor}>
          {id.replace("_", " ")}
        </h2>
        <div className="p-3">{children}</div>
      </div>
      <div className="w-full text-center pb-3">
        <Link href={`/projects/${projectId}/create-task`}>Add task +</Link>
      </div>
    </div>
  );
}
