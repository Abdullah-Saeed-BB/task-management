import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  cookies().delete("access_token");
  cookies().delete("refresh_token");

  return NextResponse.json("");
}
