import { User } from "@/interfaces/user"
import Cookies from "js-cookie"
import client from "@/lib/client/client"
import  clientSocial  from "@/lib/client/clientSocial"
import qs from "qs"
import { useDispatch } from "react-redux"
import { userLoginAction } from "@/store/user/actions"
import { userInitialState } from "@/store/user/reducer"
import useSWR, { mutate } from 'swr'

// export const getCurrentUser = () => {
//   if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
//   return client.get("/session_user", { headers: {
//     "access-token": `${Cookies.get("_access_token")}`,
//     "client": `${Cookies.get("_client")}`,
//     "uid": `${Cookies.get("_uid")}`
//   }})
// }

type Data = {
  data:{
    administratorGold: boolean
    backgroundImage: string
    id: number
    image: string
    nickname: string
    overview: string
    provider: string
  }
  isLogin: boolean
}

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
  // |undefined
  login: boolean
}

// doneyet-1-next userにundefinedを入れるかどうか。(reduxで管理していたため、そのままの状態)
export const useGetCurrentUser = (): { userSwr: Data2, error: any,userLoaded: boolean } => {
  // const dispatch = useDispatch()
  const fetcher = async() => {
    const cookie = document.cookie;
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")){
      // res.data = false
    return {data:{isLogin:false}}
    }
    const res =  await client.get('/session_user',{ headers: {
            "access-token": `${Cookies.get("_access_token")}`,
            "client": `${Cookies.get("_client")}`,
            "uid": `${Cookies.get("_uid")}`
          }})
          if (res?.data.isLogin === true) {
            // dispatch(userLoginAction(true,res.data.data))
          } else {
            // res.data = false
            // console.log(res.data.isLogin)
          }
    // console.log(res)
    // res.data = false
    return res.data
  }
  // console.log(fetcher)
  const { data, error } = useSWR('/session_user', fetcher)
  // console.log(data)
  if(!data){
    return { userSwr: {user:userInitialState.user,login:false}, error,userLoaded:false}
  }
  if(data.isLogin){
  return { userSwr: {user:data.data,login:data.isLogin}, error,userLoaded:true }
  }else{
  return { userSwr: {user:userInitialState.user,login:false}, error,userLoaded:true }
  }
}

export const execGoogle = (response:any) => {

  try{
    const data = {
      provider: "google_oauth2",
      uid:response.googleId,
      // id_token: response.tokenId,
      info: {
        email: response.profileObj.email,
        name:response.profileObj.name,
        image:response.profileObj.imageUrl
      }
    
    }
    
    return  clientSocial.post("/omniauth/google_oauth2/callback",{
    // return  clientSocial.post("/social_auth/callback",{
      headers: {
        'Authorization': `Bearer ${response.accessToken}`,
        'Content-Type': 'application/json',
        'access_token': `${response.accessToken}`
      },
      resource_class:"User",
      body:data
    // }
      ,paramsSerializer: function(data:any) {
        return qs.stringify(data, {arrayFormat: 'brackets'})
      }
    })
  }catch{
    // doneyet
    // dispatch()
  }
}



export const signOut = () => {
  return  clientSocial.delete("/auth/sign_out", { headers: {
    "access-token": `${Cookies.get("_access_token")}`,
    "client": `${Cookies.get("_client")}`,
    "uid": `${Cookies.get("_uid")}`
  }})  
}
