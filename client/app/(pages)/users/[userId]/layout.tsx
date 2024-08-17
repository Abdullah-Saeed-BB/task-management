import { User } from "@/lib/type";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { ReactNode } from "react";

type Props = {
  params: { userId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = params;

  const accessToken = cookies().get("access_token");

  const res = await fetch(`${process.env.SERVER_URL}/api/user/${userId}`, {
    headers: { authorization: `Bearer ${accessToken?.value}` },
  });

  if (res.status !== 200) return { title: "Not found" };

  const user: User = await res.json();

  return {
    title: user.name,
  };
}

function UserLayout({ children }: { children: ReactNode }) {
  return children;
}

export default UserLayout;
