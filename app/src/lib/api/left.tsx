import { genre, style } from "interfaces/product"
import client from "lib/client/client"
import useSWR, { mutate } from 'swr'

// 動作確認用
// export const execLeft = () => {
//   return client.get("/products/left")
// }

type Data = {
  styles:style[]
  genres:genre[]
}


export const execLeft = (): { data: Data; error: any } => {
  const fetcher = () => client.get('/products/left').then((res) => res.data)
  const { data, error } = useSWR('/products/left', fetcher)
  console.log(fetcher,data)
  return { data: data, error }
}