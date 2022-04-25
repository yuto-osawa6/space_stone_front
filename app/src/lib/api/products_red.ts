import axios from "axios"
import Cookies from "js-cookie"
import client from "../client/client"
// import {client} from "lib/api/client"

// 動作確認用
export const products_reds = () => {
  return client.get("/products/red", { 
    // params:{
      // text:text,
      // content:value,
      // discribe:discribe
  // }
})
}

export const products_reds2 = () => {
  return axios.get("/products/red", { 
    // params:{
      // text:text,
      // content:value,
      // discribe:discribe
  // }
})
}





// export const products_reds = () => {
//   return client.get("/products/red",{
//     headers: {
//       "access-token": `${Cookies.get("_access_token")}`,
//       "client": String(Cookies.get("_client")),
//       "uid":  String(Cookies.get("_uid"))
//     },
//   params: {
//     // aaa: `${Cookies.get("_access_token")}`,
//     // bbb: String(Cookies.get("_client")),
//     // ccc:  String(Cookies.get("_uid")),
//     aaaa:"aaaaaaaaaaaaaaaaaaa"
//    }
  
//  })
// }

// export const products_reds = () => {
//   return client.get("/products/red", { headers: {
//     "access-token": `${Cookies.get("_access_token")}`,
//     "client": `${Cookies.get("_client")}`,
//     "uid": `${Cookies.get("_uid")}`
//   }})  
// }

// export const products_reds = () => {
//   if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
//   return client.get("/products/red", { headers: {
//     "access-token": `${Cookies.get("_access_token")}`,
//     "client": `${Cookies.get("_client")}`,
//     "uid": `${Cookies.get("_uid")}`
//   }})
// }

// export const execGenreSearch = (data:string)=>{
//   return client.get("/mains/genressearch",{
//     params: {
//      data:"aaa"
//     }
   
//   })
// }

// export const layout = () =>{
//   return client.get("/")
// }

// return client.post("/social_auth/callback",{
//   // params:{
//   headers: {
//     'Authorization': `Bearer ${response.vc.access_token}`,
//     'Content-Type': 'application/json',
//     'access_token': `${response.vc.access_token}`
//   },
//   resource_class:"User",
//   // body: JSON.stringify(data)
//   body:data
// // }
//   ,paramsSerializer: function(data:any) {
//     return qs.stringify(data, {arrayFormat: 'brackets'})
//   }
// })