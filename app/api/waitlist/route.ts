
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received waitlist data:", data);

    return NextResponse.json({ success: true, message: "Form received!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}