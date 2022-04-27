import qs from "qs"
// import { client } from "./client"
import { genres, search, styles} from "@/interfaces/main"
import client from "../client/client"


export const execMain = () => {
  return client.get("/mains")
}
// export const arrayGenres:string[] =[]

// type arrGenres = string[]
type sort = {
  s:string
}
type cast = {
  casts_id_in:string[]
}
// type 
type searchparams = search&genres&styles&sort&cast




// export const execSearch = (data:search,genrelist:genres) =>{
// export const execSearch = (data:searchparams,page:string) =>{
export const execSearch = (data:any) =>{
  
  return client.get("/mains/search",{
    params: {
     q:data,
    //  q:genrelist
    // page
    }
    ,paramsSerializer: function(data) {
      return qs.stringify(data, {arrayFormat: 'brackets'})
    }
  })
};


export const execSearchScroll = (data:searchparams,page:string) =>{
  
  return client.get("/mains/search",{
    params: {
     q:data,
    //  q:genrelist
    page
    }
    ,paramsSerializer: function(data) {
      return qs.stringify(data, {arrayFormat: 'brackets'})
    }
  })
};













export const execGenreSearch = (data:string)=>{
  return client.get("/mains/genressearch",{
    params: {
     data
    }
    // ,paramsSerializer: function(data) {
    //   return qs.stringify(data, {arrayFormat: 'brackets'})
    // }
  })
}

// 
export const execCastSearch = (inputText:string) => {
  return client.get(`/mains/castssearch`,{
  params:{
    data:inputText
   }
  })
}

export const execStudioSearch = (inputText:string) =>{
  return client.get("/mains/studiossearch",{
    params: {
      data:inputText
    }
  })
}
// 


export const execFindCast = (id:number) => {
  return client.get(`/mains/findcast`,{
  params:{
    id:id
   }
  })
}




export const execChangeGrid = (grid:string)=>{
  return client.get("/mains/grid",{
    params: {
     grid
    }
   
  })
}

export const execsetGrid = ()=>{
  return client.get("/mains/setgrid",{
    params: {
    }
   
  })
}



// export const execSearchPage = (data:searchparams,page:number) => {
//   return client.get("mains/search",{
//     params: {
//       data
//      }

//      ,paramsSerializer: function(data) {
//       return qs.stringify(data, {arrayFormat: 'brackets'})
//     }
//   })
// };


// product_search

export const execProductSearchHandler = (data:string)=>{
  return client.get("/mains/productSearch",{
    params: {
     product_title:data
    }
  })
}

// month during get

export const execMonthDuringHandler = ()=>{
  return client.get("/mains/monthduring",{
    
  })
}
// top100

export const  execTop100Handler = (month:Date|undefined,genre:number) => {
  return client.get("/mains/top100",{
    params:{
      month:month,
      genre:genre
    }
  })
}

// get emotion list

export const execGetEmotionList = () => {
  return client.get("/mains/emotion",{
   
  })
}

// // 2.1
// export const execWeeklyRanking = () => {
//   return client.get("/mains/emotion",{
   
//   })
// }

export const execWeekliyRankingsMain = () => {
  return client.get("/mains/weekliy_main",{
   
  })
}

export const execTierSeasonMain = (page:number) => {

  return client.get("/mains/tier_main",{
    params:{
      page_year:page,
    }
  })
}

export  const execUserSearch = (text:string,page:number) => {
  return client.get("/mains/user_search",{
    params:{
      text:text,
      page:page
    }
  })
}