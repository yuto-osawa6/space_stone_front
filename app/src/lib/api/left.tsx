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
  status:number
}


export const execLeft = (): { data: Data; error: any } => {
  // const fetcher = async() => {
  //   const res =  await client.get('/products/left')
  //   if (res.data.status!==200) {
  //     const error = new Error('An error occurred while fetching the data.')
  //     // Attach extra info to the error object.
  //     // error.info = await res.json()
  //     // error.status = res.status
  //     // console.log(error)
  //     throw error
  //   }
  //   return res.data
  // }
  // const fetcher =() => {
  //   const res = client.get('/products/left').then((res) => res.data)
  //   return res
  // }
  const fetcher = () => client.get('/products/left').then((res) => res.data)
  const { data, error } = useSWR('/products/left', fetcher)
  // console.log(fetcher,data,error)
  return { data: data, error }
}