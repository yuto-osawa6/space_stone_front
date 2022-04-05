// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

// export async function getData() {
//   const response = await fetch("http://api:3001/api/v1/products/red", {method: "GET"});
//   const jsonData = await response.json()
//   return jsonData
// }