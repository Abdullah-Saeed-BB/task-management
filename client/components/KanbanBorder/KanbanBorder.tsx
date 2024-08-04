"use client";
import { Task } from "@/lib/type";
// import Container from "@/components/KanbanBorder/Container";
import { useId, useState } from "react";

import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  closestCorners,
} from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";
import { useChangeTaskStatusMutation } from "@/lib/slices/apiSlice";

type TaskStatus = "STUCK" | "WORKING_ON" | "DONE";

function KanbanBorder({
  Tasks,
  projectId,
}: {
  Tasks: Task[];
  projectId: string;
}) {
  const [tasks, setTasks] = useState(Tasks);
  const [changeTaskStatus] = useChangeTaskStatusMutation();

  const convertStatus = (status: UniqueIdentifier | undefined): TaskStatus => {
    switch (status) {
      case "STUCK":
      case "WORKING_ON":
      case "DONE":
        return status;
      default:
        return "STUCK";
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { over, active } = event;

    const newStatus = convertStatus(over?.id);

    if (newStatus !== tasks.find((t) => active.id === t.id)?.status) {
      setTasks(
        tasks.map((task) => {
          if (task.id === active.id) {
            return { ...task, status: newStatus };
          }
          return task;
        })
      );

      try {
        await changeTaskStatus({ id: active.id, status: newStatus });
      } catch (err: any) {
        console.log(`Error: ${err}`);
      }
    }
  };

  return (
    <div className="flex m-3 space-x-3">
      <DndContext
        id="dnd-context"
        collisionDetection={closestCorners}
        onDragEnd={onDragEnd}
      >
        <Droppable id="STUCK" bgColor="bg-red-200" projectId={projectId}>
          {tasks
            .filter((t) => t.status === "STUCK")
            .map((t) => (
              <Draggable key={t.id} task={t} />
            ))}
        </Droppable>
        <Droppable id="WORKING_ON" bgColor="bg-amber-200" projectId={projectId}>
          {tasks
            .filter((t) => t.status === "WORKING_ON")
            .map((t) => (
              <Draggable key={t.id} task={t} />
            ))}
        </Droppable>
        <Droppable id="DONE" bgColor="bg-green-200" projectId={projectId}>
          {tasks
            .filter((t) => t.status === "DONE")
            .map((t) => (
              <Draggable key={t.id} task={t} />
            ))}
        </Droppable>
      </DndContext>
    </div>
  );
}

export default KanbanBorder;