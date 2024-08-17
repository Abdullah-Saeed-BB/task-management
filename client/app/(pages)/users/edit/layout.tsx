import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export async function generateMetadata() {
  const accessToken = cookies().get("access_token");

  if (accessToken) {
    const data = jwt.decode(accessToken.value);

    return { title: (data as JwtPayload).name };
  }

  return {
    title: "Edit user",
  };
}

function EditPageLayout({ children }: { children: ReactNode }) {
  return children;
}

export default EditPageLayout;
