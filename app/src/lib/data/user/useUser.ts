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
  }|undefined
  login: boolean
}

export const useUser = ():{ user: Data2, error: any } => {
  const { data, error } = useSWR('/session_user')
  if(data){
    return { user: {user:data.data,login:data.isLogin}, error }
  }else{
    return { user: {user:undefined,login:false}, error }
  }
}