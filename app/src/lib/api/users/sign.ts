import { User } from "interfaces/user"
import Cookies from "js-cookie"
import client from "lib/client/client"
import { clientSocial } from "lib/client/clientSocial"
import qs from "qs"
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
  user:User
}



export const getCurrentUser = (): { data: Data | undefined, error: any } => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")){
    return { data:undefined,error:undefined}
  }
  const fetcher = async() => {
    const res =  await client.get('/products/left',{ headers: {
            "access-token": `${Cookies.get("_access_token")}`,
            "client": `${Cookies.get("_client")}`,
            "uid": `${Cookies.get("_uid")}`
          }})
    console.log(res)
    // if (res.data.status!==200) {
    //   const error = new Error('An error occurred while fetching the data.')
    //   // Attach extra info to the error object.
    //   // error.info = await res.json()
    //   // error.status = res.status
    //   // console.log(error)
    //   throw error
    // }
    return res.data
  }
  // const fetcher = () => client.get('/session_user',{ headers: {
  //       "access-token": `${Cookies.get("_access_token")}`,
  //       "client": `${Cookies.get("_client")}`,
  //       "uid": `${Cookies.get("_uid")}`
  //     }}).then((res) => res.data)
  const { data, error } = useSWR('/products/left', fetcher)
  // console.log(fetcher,data,error)
  return { data: data, error }
}