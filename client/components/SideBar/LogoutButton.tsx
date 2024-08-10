"use client";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "DELETE" });

    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center w-full text-lg gap-4"
    >
      <FontAwesomeIcon icon={faRightFromBracket} className="size-7" />
      <span>Log out</span>
    </button>
  );
}

export default LogoutButton;
