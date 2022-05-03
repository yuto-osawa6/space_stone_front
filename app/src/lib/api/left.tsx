import { genre, style } from "@/interfaces/product"
import client from "@/lib/client/client"
import { useDispatch } from "react-redux"
import { actionSettingGenresData } from "@/store/genres/action"
import { actionSettingStylesData } from "@/store/styles/actions"
import useSWR, { mutate } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { GetError } from "../error/error"

// 動作確認用
// export const execLeft = () => {
//   return client.get("/products/left")
// }

type Data = {
  styles:style[]
  genres:genre[]
  status:number
}
// const dispatch = useDispatch()

export const execLeftfetcher = async() => {
  const res =  await client.get('/products/left')
  if (res.status===200) {
    // doneyet-1-next 後々変更 (redux使う必要がない。)
    // dispatch(actionSettingGenresData(res.data.genres));
    // dispatch(actionSettingStylesData(res.data.styles));
  }else{
    // console.log("aaomueeeeeeeeer")
    // throw new GetError('Received get examples error');
  }
  console.log(res)
  return res.data
}


export const useExecLeft = (): { data: Data; error: any } => {
  const { data, error } = useSWRImmutable('/products/left', execLeftfetcher)
  return { data: data, error }
}