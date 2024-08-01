import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navlink from "./Navlink";
import ProjectsLinks from "./ProjectsLinks";

async function SideBar() {
  return (
    <div className="bg-slate-200 w-64 py-6 h-screen text-slate-700 flex flex-col justify-between fixed">
      <div className="space-y-10 grow flex flex-col">
        <Navlink />
        <ProjectsLinks />
      </div>
      <div className="basis-24 mx-4">
        <hr className="border-slate-400 my-8 " />
        <button className="flex items-center w-full text-lg gap-4">
          <FontAwesomeIcon icon={faRightFromBracket} className="size-7" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
