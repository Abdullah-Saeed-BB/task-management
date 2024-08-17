import { Project } from "@/lib/type";
import { Metadata } from "next";
import { cookies } from "next/headers";

type Props = {
  params: { projectId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = params;

  const accessToken = cookies().get("access_token");

  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/api/project/${projectId}`,
      { headers: { authorization: `Bearer ${accessToken?.value}` } }
    );

    const project: Project = await res.json();

    return {
      title: project.title,
    };
  } catch {
    return {
      title: "Not found",
    };
  }
}

function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export default ProjectLayout;
