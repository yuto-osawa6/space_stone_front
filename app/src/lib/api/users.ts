// import {client, clientSocial } from "./client"
import Cookies from "js-cookie"
import qs from "qs"
import client from "../client/client"
import { clientSocial } from "../client/clientSocial"


export const google_oauth = () => {
  return client.get("/auth/google_oauth2")
}

export const execGoogle = (response:any) => {
  console.log(response, "I AM RESPONSE FROM GOOGLE")
  // var token = response;
  console.log(response)
  const data = {
    provider: "google_oauth2",
    // uid: response.xu.BW,
    uid:response.googleId,
    // id_token: response.vc.id_token,
    id_token: response.tokenId,
    info: {
      // email: token.nt.Wt
      // email: response.xu.lv
      email: response.profileObj.email,
      name:response.profileObj.name,
      image:response.profileObj.imageUrl
    }
   
  }
 

  return  clientSocial.post("/social_auth/callback",{
    // params:{
    headers: {
      'Authorization': `Bearer ${response.accessToken}`,
      'Content-Type': 'application/json',
      'access_token': `${response.accessToken}`
    },
    resource_class:"User",
    // body: JSON.stringify(data)
    body:data
  // }
    ,paramsSerializer: function(data:any) {
      return qs.stringify(data, {arrayFormat: 'brackets'})
    }
  })
}



export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return client.get("/session_user", { headers: {
    "access-token": `${Cookies.get("_access_token")}`,
    "client": `${Cookies.get("_client")}`,
    "uid": `${Cookies.get("_uid")}`
  }})
}

export const signOut = () => {
  return  clientSocial.delete("/auth/sign_out", { headers: {
    "access-token": `${Cookies.get("_access_token")}`,
    "client": `${Cookies.get("_client")}`,
    "uid": `${Cookies.get("_uid")}`
  }})  
}

// show setting

export const execSettingUserHandler = (nickname:string,user_id:number) => {
  return client.patch("/users/setting",{
    nickname:nickname,
    user_id:user_id
  })
}


export const execUsersShowHandler = (user_id:string) => {
  return client.get(`/users/${user_id}`,{
    params:{
    user_id:user_id
  }
  })
}

export const execUserBackgroundImageHandler = (user_id:number,data:FormData) => {
  return client.patch(`/users/background`,data,{
    headers:{
          "content-type": "multipart/form-data"
        },
    // user:{

    // }
  })
}


export const execCreateOverviewToUser = (user_id:number,content:string) => {
  return client.patch(`/users/overview`,{
    user_id:user_id,
    user:{
      overview:content
    }
   
  })
}

// show likes

export const execUserShowLikesProductsHandler = (user_id:number,page:number) => {
  return client.get(`/users/likes`,{  
    params:{
      user_id:user_id,
      page:page
    }
  })
}

// show socres



export const execUserShowScoresProductsHandler = (user_id:number,page:number,scoreIndex: number) => {
  return client.get(`/users/scores`,{  
    params:{
      user_id:user_id,
      page:page,
      scoreIndex:scoreIndex
    }
  })
}

// show reviews threads

export const execUserShowReviewsHandler = (user_id:number,page:number,product: number| undefined,selectSort: number | null,emotion: number | undefined) => {
  return client.get(`/users/reviews`,{  
    params:{
      user_id:user_id,
      page:page,
      product_id:product,
      selectSort:selectSort,
      emotion:emotion
    }
  })
}
// execUserShowThreadsHandler

export const execUserShowThreadsHandler = (user_id:number,page:number,product: number| undefined,selectSort: number | null) => {
  return client.get(`/users/threads`,{  
    params:{
      user_id:user_id,
      page:page,
      product_id:product,
      selectSort:selectSort
    }
  })
}

// likegenres

export const execUserShowLikeGenresHandler = (user_id:number) => {
  return client.get(`/users/likeGenres`,{  
    params:{
      user_id:user_id,
      // page:page
    }
  })
}

export  const execGetMyTiers = (user_id:number,current: number) => {
  return client.get(`/users/mytiers`,{  
    params:{
      user_id:user_id,
      page:current
    }
  })
}

// change score array



export  const execChangeScoreArrayies = (user_id:number,index: number) => {
  return client.get(`/users/change_score_arrayies`,{  
    params:{
      user_id:user_id,
      indexNumber:index
    }
  })
}

// delete User
export const execDeleteUser = (user_id:number) => {
  return client.delete(`/users/${user_id}`,{  
    params:{
      user_id:user_id,
    }
  })
}