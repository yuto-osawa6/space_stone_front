import { product } from "interfaces/product"
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
  const { data } = useSWRImmutable<tierRes>('/mainblocks/mains/update_tier_list/1')
  return { data }
}