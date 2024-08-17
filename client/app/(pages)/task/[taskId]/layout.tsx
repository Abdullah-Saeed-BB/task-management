import { Task } from "@/lib/type";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { ReactNode } from "react";

type Props = {
  params: { taskId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { taskId } = params;

  const accessToken = cookies().get("access_token");

  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/task/${taskId}`, {
      headers: { authorization: `Bearer ${accessToken?.value}` },
    });

    const task: Task = await res.json();

    return {
      title: task.title,
    };
  } catch {
    return {
      title: "Not found",
    };
  }
}

function TaskLayout({ children }: { children: ReactNode }) {
  return children;
}

export default TaskLayout;
