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
import { useChangeTaskStatusMutation } from "@/lib/store/slices/apiSlice";
import ErrorPopup from "../ErrorPopup";
import { useUserPermissions } from "@/lib/useUserPermissions";
import {
  faBarsProgress,
  faClipboardCheck,
  faEllipsis,
  faList,
} from "@fortawesome/free-solid-svg-icons";

type TaskStatus = "STUCK" | "WORKING_ON" | "DONE";

function KanbanBorder({
  Tasks,
  projectId,
  canCreate,
}: {
  Tasks: Task[];
  projectId: string;
  canCreate: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState(Tasks);
  const [changeTaskStatus] = useChangeTaskStatusMutation();
  const user = useUserPermissions();

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
        await changeTaskStatus({ id: active.id, status: newStatus }).unwrap();
      } catch (err: any) {
        setError(err.data);
      }
    }
  };

  return (
    <div className="flex px-2 py-3 overflow-auto space-x-3">
      {error ? (
        <ErrorPopup message={error} onClose={() => setError(null)} />
      ) : null}
      <DndContext
        id="dnd-context"
        collisionDetection={closestCorners}
        onDragEnd={onDragEnd}
      >
        <Droppable
          id="STUCK"
          icon={faList}
          projectId={projectId}
          canCreate={canCreate}
        >
          {tasks
            .filter((t) => t.status === "STUCK")
            .map((t) => (
              <Draggable key={t.id} task={t} userId={user.id} />
            ))}
        </Droppable>
        <Droppable
          id="WORKING_ON"
          icon={faBarsProgress}
          projectId={projectId}
          canCreate={canCreate}
        >
          {tasks
            .filter((t) => t.status === "WORKING_ON")
            .map((t) => (
              <Draggable key={t.id} task={t} userId={user.id} />
            ))}
        </Droppable>
        <Droppable
          id="DONE"
          icon={faClipboardCheck}
          projectId={projectId}
          canCreate={canCreate}
        >
          {tasks
            .filter((t) => t.status === "DONE")
            .map((t) => (
              <Draggable key={t.id} task={t} userId={user.id} />
            ))}
        </Droppable>
      </DndContext>
    </div>
  );
}

export default KanbanBorder;
