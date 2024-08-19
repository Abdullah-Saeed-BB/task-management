"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreateProject from "./CreateProject";
import { useGetProjectsTitlesQuery } from "@/lib/store/slices/apiSlice";
import Loading from "../Loading";
import type { Project } from "@/lib/type";
import { useUserPermissions } from "@/lib/useUserPermissions";

function ProjectsLinks() {
  const pathname = usePathname();
  const user = useUserPermissions();

  const { data, isLoading, isError } = useGetProjectsTitlesQuery();

  if (isLoading) return <Loading />;
  else if (isError)
    return (
      <h2 className="text-center italic px-2">Error fetch projects data</h2>
    );
  else if (data) {
    return (
      <div className="grow flex flex-col pr-2 ">
        <p className="text-slate-500 text-sm uppercase lg:mb-5 mb-2 ml-4">
          Projects
        </p>
        <ul
          className="overflow-auto h-24 grow"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #e2e8f0",
          }}
        >
          {data?.map((p: Project) => {
            const path = `/projects/${p.id}`;
            const isActive = pathname === path;

            return (
              <li
                key={p.id}
                className={`py-1 my-2 pl-4 ${isActive ? "bg-slate-300" : ""}`}
              >
                <Link
                  href={path}
                  className="flex items-center gap-3 transition-opacity focus:opacity-70"
                >
                  <span
                    className="rounded-md basis-5 size-5 md:size-4 md:basis-4 lg:size-5 lg:basis-5 drop-shadow-md "
                    style={{ backgroundColor: p.color }}
                  ></span>
                  <p className="line-clamp-1 max-w-64 md:max-w-24 lg:max-w-64">
                    {p.title}
                  </p>
                </Link>
              </li>
            );
          })}
          <li className="py-1 my-2 pl-4">
            {!user.isEmployee && <CreateProject />}
          </li>
        </ul>
      </div>
    );
  }
}

export default ProjectsLinks;
