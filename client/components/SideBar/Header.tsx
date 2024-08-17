"use client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/logo.png";
import { useEffect, useRef, useState } from "react";
import Navlink from "./Navlink";
import ProjectsLinks from "./ProjectsLinks";
import ProfileLink from "./ProfileLink";

function Header() {
  const [openSidebar, setOpenSideBar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleCloseSidebar(event: Event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpenSideBar(false);
      }
    }

    if (openSidebar) {
      document.addEventListener("mousedown", handleCloseSidebar);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseSidebar);
    };
  });

  return (
    <div>
      <div className="z-50 fixed drop-shadow-sm bg-slate-200 w-screen h-14 flex items-center gap-6 px-5">
        <button className="text-xl" onClick={() => setOpenSideBar(true)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div>
          <Link
            href="/"
            className="flex tracking-widest items-center gap-2  text-slate-600 text-xl font-semibold"
          >
            <Image
              alt="Task management application logo"
              src={Logo}
              className="size-8"
            />
            <h2>TaskMaster</h2>
          </Link>
        </div>
      </div>
      {openSidebar && (
        <div className="fixed z-50 inset-0 bg-slate-600 bg-opacity-50">
          <div
            ref={sidebarRef}
            className="bg-slate-200 w-64 pb-6 pt-3 h-screen space-y-2 text-slate-700 flex flex-col justify-between fixed z-30"
          >
            <div className="space-y-10 grow flex flex-col">
              <div className="flex gap-1">
                <button
                  className="text-xl px-5"
                  onClick={() => setOpenSideBar(false)}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <div>
                  <Link
                    href="/"
                    className="flex tracking-widest items-center gap-2  text-slate-600 text-xl font-semibold"
                  >
                    <Image
                      alt="Task management application logo"
                      src={Logo}
                      className="size-8"
                    />
                    <h2>TaskMaster</h2>
                  </Link>
                </div>
              </div>
              <Navlink />
              <ProjectsLinks />
            </div>
            <div className="mx-4">
              <ProfileLink />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
