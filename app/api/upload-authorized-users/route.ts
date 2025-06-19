import { NextResponse } from "next/server"
import { uploadAuthorizedUsers } from "@/iitm-iris-website/utils/upload-authorized-users"

export async function GET() {
  try {
    const result = await uploadAuthorizedUsers()

    if (result.success) {
      return NextResponse.json({ success: true, count: result.count })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in upload API route:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
