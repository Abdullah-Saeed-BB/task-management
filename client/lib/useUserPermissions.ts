import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export function useUserPermissions() {
  const token = Cookies.get("authentication")!;

  const data = jwt.decode(token);

  return <
    {
      id: string;
      isEmployee: boolean;
    }
  >data;
}
