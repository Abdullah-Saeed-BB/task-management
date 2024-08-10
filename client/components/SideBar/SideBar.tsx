import Navlink from "./Navlink";
import ProjectsLinks from "./ProjectsLinks";
import LogoutButton from "./LogoutButton";

function SideBar() {
  return (
    <div className="bg-slate-200 w-64 py-6 h-screen text-slate-700 flex flex-col justify-between fixed z-50">
      <div className="space-y-10 grow flex flex-col">
        <Navlink />
        <ProjectsLinks />
      </div>
      <div className="basis-24 mx-4">
        <hr className="border-slate-400 my-8 " />
        <LogoutButton />
      </div>
    </div>
  );
}

export default SideBar;
