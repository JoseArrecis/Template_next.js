import prisma from "@/prisma/prismaClient"

export async function POST(req) {
  try {
    const { email, code } = await req.json()

    const token = await prisma.verificationToken.findUnique({
      where: { token: code }
    })

    if (!token || token.identifier !== email) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired code" }),
        { status: 400 }
      )
    }

    if (token.expires < new Date()) {
      return new Response(
        JSON.stringify({ error: "Code expired" }),
        { status: 400 }
      )
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() }
    })

    await prisma.verificationToken.delete({
      where: { token: code }
    })

    return new Response(
      JSON.stringify({ message: "Account verified successfully" }),
      { status: 200 }
    )
  } catch (err) {
    console.error("Verification error:", err)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    )
  }
}
