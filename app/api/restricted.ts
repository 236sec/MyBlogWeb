import { getServerSession } from "next-auth/next"
import { authOptions } from "@/utils/authOptions"


export default async function reti(req : any, res : any) {
  const session = await getServerSession(req, res, authOptions as any)
  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}