"use client";
import { faFolderOpen, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHouse, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Link = {
  icon: IconDefinition;
  path: string;
  title: string;
};

const links: Link[] = [
  { icon: faHouse, path: "/", title: "Dashboard" },
  { icon: faFolderOpen, path: "/projects", title: "Projects" },
  { icon: faUser, path: "/users", title: "Users" },
];

function Navlink() {
  const pathname = usePathname();

  return (
    <div>
      <p className="text-slate-500 text-sm uppercase lg:mb-5 mb-2 ml-4">
        Main menu
      </p>
      <div className=" *:flex *:items-center *:gap-4 *:pl-4 *:py-1 space-y-2">
        {links.map((l) => {
          const isActive = pathname === l.path;

          return (
            <Link
              key={l.path}
              href={l.path}
              className={isActive ? "bg-slate-300" : ""}
            >
              <FontAwesomeIcon icon={l.icon} className="size-5" />
              <span>{l.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Navlink;
