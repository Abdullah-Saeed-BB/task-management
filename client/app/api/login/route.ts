import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${process.env.SERVER_URL}/api/user/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });

  try {
    const data = await res.json();

    if (!data?.accessToken || !data?.refreshToken) {
      return NextResponse.json(data, { status: 400 });
    }

    const { accessToken, refreshToken } = data;

    cookies().set("access_token", accessToken);
    cookies().set("refresh_token", refreshToken);

    return NextResponse.json("Succeful creating token", { status: 200 });
  } catch (err: any) {
    return NextResponse.json(err, { status: 400 });
  }
}
