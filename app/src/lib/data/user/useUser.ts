import { userInitialState } from "@/store/user/reducer"
import useSWR from "swr"

// type Data = {
//   data:{
//     administratorGold: boolean
//     backgroundImage: string
//     id: number
//     image: string
//     nickname: string
//     overview: string
//     provider: string
//   }
//   isLogin: boolean
// }

type Data2 = {
  user:{
    administratorGold: boolean
    backgroundImage: string
    id: number
    image: string
    nickname: string
    overview: string
    provider: string
  }
  login: boolean
}

export const useUser = ():{ userSwr: Data2, error: any } => {
  const { data, error } = useSWR('/session_user')
  if(data){
    return { userSwr: {user:data.data,login:data.isLogin}, error }
  }else{
    return { userSwr: {user:userInitialState.user,login:false}, error }
  }
}