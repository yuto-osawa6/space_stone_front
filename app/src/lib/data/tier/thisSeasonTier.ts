import { product } from "interfaces/product"
import client from "lib/client/client"
import useSWR from "swr"
import useSWRImmutable from 'swr/immutable'


type tierRes = {
  tier:product[]
  tierAverage:avg[]
}
type avg =  {
  [k:string]:string
}

export const useThisSeasonTier = ():{data:tierRes | undefined} => {
  // const fetcher = () => client.get('/mainblocks/mains/update_tier_list',{params:{current_number:1}}).then((res) => res.data)
  // const { data } = useSWRImmutable<tierRes>('/mainblocks/mains/update_tier_list/1',fetcher)
  const { data } = useSWRImmutable<tierRes>('/mainblocks/mains/update_tier_list/1')
  return { data }
}