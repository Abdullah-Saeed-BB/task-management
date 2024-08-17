import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

type tokenData = {
  id: string;
  name: string;
  isEmployee: boolean;
};

export function useUserPermissions() {
  const token = Cookies.get("access_token")!;

  const data = jwt.decode(token);

  return <tokenData>data;
}
