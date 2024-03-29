import { product } from "@/interfaces/product";
import client from "@/lib/client/client";
import { useUser } from "@/lib/data/user/useUser";
import useSWR from "swr";
import useSWRImmutable from 'swr/immutable'


type Data = {
  tier:product[] 
  tierAverage:any
  aliceT:number
}
type Data2 = {
  tier:product[] 
  tierAverage:any
  aliceT:number
}
export const useExecGetThisSeasonTier = (): { data: Data } => {
  const fetcher = () => client.get('/mainblocks/mains/update_tier_list',{params:{current_number:1}}).then((res) => res.data)
  const { data, error } = useSWRImmutable('/mainblocks/mains/update_tier_list/1', fetcher)
  return { data: data}
}

export const useExecGetNextSeasonTier = (): { data: Data2 } => {
  const fetcher = () => client.get('/mainblocks/mains/update_tier_list',{params:{current_number:2}}).then((res) => res.data)
  const { data, error } = useSWRImmutable('/mainblocks/mains/update_tier_list/2', fetcher)
  return { data: data}
}

type UserTier = {
  group: number
  id: number
  product: product
  tier: number
  userId: number
}

export const useExecGetUserTier = (current_number:number) => {
    const { userSwr } = useUser()
    const fetcher = async() => {
    if (userSwr.login==false)return
    const res =  await client.get('/mainblocks/mains/user_this_season_tier',{
      params:{
        user_id:userSwr.user.id,
        current_number:current_number
      }
    })
    if (res.data.status == 200) {
      res.data.userTier.forEach((i:any)=>{
        const tier = i.tier
        if(0<=tier&&tier<=10){
        Object.assign(i,{group:5})
        }else if(10<tier&&tier<=30) {
        Object.assign(i,{group:4})
        }else if(30<tier&&tier<=50){
        Object.assign(i,{group:3})
        }else if(50<tier&&tier<=70){
        Object.assign(i,{group:2})
        }else if(70<tier&&tier<=90){
        Object.assign(i,{group:1})
        }else if(90<tier&&tier<=100){
        Object.assign(i,{group:0})
        }else{
        }
    })
    }
    return res.data.userTier
  }
  const { data, error } = useSWRImmutable<UserTier[]>('/mainblocks/mains/user_this_season_tier/1', fetcher)
  return {userTier:data, error} 
}


export const useExecGetUserTier2 = (current_number:number) => {
  const { userSwr } = useUser()
  const fetcher = async() => {
  if (userSwr.login==false)return
  const res =  await client.get('/mainblocks/mains/user_this_season_tier',{
    params:{
      user_id:userSwr.user.id,
      current_number:current_number
    }
  })
  if (res.data.status == 200) {
    res.data.userTier.forEach((i:any)=>{
      const tier = i.tier
      if(0<=tier&&tier<=10){
      Object.assign(i,{group:5})
      }else if(10<tier&&tier<=30) {
      Object.assign(i,{group:4})
      }else if(30<tier&&tier<=50){
      Object.assign(i,{group:3})
      }else if(50<tier&&tier<=70){
      Object.assign(i,{group:2})
      }else if(70<tier&&tier<=90){
      Object.assign(i,{group:1})
      }else if(90<tier&&tier<=100){
      Object.assign(i,{group:0})
      }else{
      }
   })
  }
  return res.data.userTier
}
const { data, error } = useSWRImmutable<UserTier[]>('/mainblocks/mains/user_this_season_tier/2', fetcher)
return {userTier:data, error} 
}



  

// export const execGetUserTier  = (user_id:number,current_number:number) => {
//   return client.get("mainblocks/mains/user_this_season_tier",{
//     params:{
//     // season:season,
//     user_id:user_id,
//     current_number:current_number
//     }
//   })
// }