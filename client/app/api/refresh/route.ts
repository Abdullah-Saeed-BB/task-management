import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const refreshToken = cookies().get("refresh_token");

  if (refreshToken?.value) {
    const res = await fetch(`${process.env.SERVER_URL}/api/user/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: refreshToken.value }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok)
      return NextResponse.json(res.statusText, { status: res.status });

    const { accessToken } = await res.json();

    cookies().set("access_token", accessToken);

    return NextResponse.json(null);
  }
}
