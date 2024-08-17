import Navlink from "./Navlink";
import ProjectsLinks from "./ProjectsLinks";
import ProfileLink from "./ProfileLink";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/logo.png";

function SideBar() {
  return (
    <div className="lg:mr-64 mr-44">
      <div className="bg-slate-200 lg:w-64 w-44 py-6 h-screen space-y-2 text-slate-700 flex flex-col justify-between fixed z-30">
        <div className="space-y-10 grow flex flex-col">
          <Link
            href="/"
            className="px-3 flex tracking-widest items-center lg:gap-2 gap-1 text-slate-600 lg:text-xl text-lg font-semibold"
          >
            <Image
              alt="Task management application logo"
              src={Logo}
              className="lg:size-10 size-8"
            />
            <h2>TaskMaster</h2>
          </Link>
          <Navlink />
          <ProjectsLinks />
        </div>
        <div className="mx-4">
          <ProfileLink />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
