import { User } from "@/interfaces/user"
import Cookies from "js-cookie"
import client from "@/lib/client/client"
import { clientSocial } from "@/lib/client/clientSocial"
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
export const useGetCurrentUser = (): { userSwr: Data2, error: any } => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaasgg")
  // const dispatch = useDispatch()
  const fetcher = async() => {
    const cookie = document.cookie;
    console.log(cookie);
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")){
      console.log("aaaaaaaaaaagggeeg")
    return
    }
    const res =  await client.get('/session_user',{ headers: {
            "access-token": `${Cookies.get("_access_token")}`,
            "client": `${Cookies.get("_client")}`,
            "uid": `${Cookies.get("_uid")}`
          }})
          if (res?.data.isLogin === true) {
            // dispatch(userLoginAction(true,res.data.data))
            console.log(res?.data.data)
          } else {
          }
    console.log(res)
    return res.data
  }
  const { data, error } = useSWR('/session_user', fetcher)
  if(data){
  return { userSwr: {user:data.data,login:data.isLogin}, error }
  }else{
  return { userSwr: {user:userInitialState.user,login:false}, error }
  }
}

export const execGoogle = (response:any) => {
  console.log("aaabbb")
  console.log(response)

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

// export const execGoogle = (response:any): { data: Data | undefined, error: any } => {
//   const params = {
//     provider: "google_oauth2",
//     uid:response.googleId,
//     id_token: response.tokenId,
//     info: {
//       email: response.profileObj.email,
//       name:response.profileObj.name,
//       image:response.profileObj.imageUrl
//     }
//   }
//   const fetcher = async() => {
//   const res = await clientSocial.post("/social_auth/callback",{
//     headers: {
//       'Authorization': `Bearer ${response.accessToken}`,
//       'Content-Type': 'application/json',
//       'access_token': `${response.accessToken}`
//     },
//     resource_class:"User",
//     body:params
//     ,paramsSerializer: function(params:any) {
//       return qs.stringify(params, {arrayFormat: 'brackets'})
//     }
//   })
//   if(res==undefined){
//     dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
//     return
//   }
//   console.log(res)
//   if (res.status === 201) {
//     Cookies.set("_access_token", res.data.headers.accessToken)
//     Cookies.set("_client", res.data.headers.client)
//     Cookies.set("_uid", res.data.headers.uid)
//     console.log(res)
//     dispatch(userLoginAction(true,res.data.data))
//     // mutate('/session_user')
//   }else{
//     console.log("失敗しました。")
//   }
//   }
//   // const { data, error } = useSWR('/social_auth/callback', fetcher)
//   // return { data: data, error }
// }



export const signOut = () => {
  return  clientSocial.delete("/auth/sign_out", { headers: {
    "access-token": `${Cookies.get("_access_token")}`,
    "client": `${Cookies.get("_client")}`,
    "uid": `${Cookies.get("_uid")}`
  }})  
}


// export const GoogleLogin2 = () => {
//   return  clientSocial.get("/auth/google_oauth2",{
  
//   })
// }