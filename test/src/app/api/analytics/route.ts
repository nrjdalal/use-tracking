export async function POST(request: Request) {
  const event = await request.json()

  // add your logic here, like to update db, etc

  console.log(event)

  return Response.json({ success: true })
}
