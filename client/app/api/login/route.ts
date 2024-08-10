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

    if (!data?.accessToken) {
      return NextResponse.json(data, { status: 400 });
    }

    cookies().set("authentication", data.accessToken);

    return NextResponse.json("Succeful creating token", { status: 200 });
  } catch (err: any) {
    console.log(`Error is: ${err}`);

    return NextResponse.json(err, { status: 400 });
  }
}
