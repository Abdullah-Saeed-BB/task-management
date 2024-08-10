import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  cookies().delete("authentication");

  return NextResponse.json("");
}
