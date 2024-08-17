"use client";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "DELETE" });

    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-full bg-slate-300 text-slate-700 box-content size-9 flex justify-center items-center"
    >
      <FontAwesomeIcon icon={faArrowRightFromBracket} className="size-4" />
    </button>
  );
}

export default LogoutButton;
