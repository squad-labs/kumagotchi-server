import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ data: "success" }, { status: 200 });
}
