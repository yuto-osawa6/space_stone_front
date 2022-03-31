import client from "../../client/client"
import qs from "qs"

type product = {
  title:string
  imageUrl:string
  description:string
  list:string | undefined
  year:string
  kisetsu:string[]
  delivery_start:Date | null
  delivery_end:Date | null

  imageUrl2:string | undefined
  imageUrl3:string | undefined
  imageUrlh1:string | undefined
  imageUrlh2:string | undefined
  imageUrlh3:string | undefined

  copyright:string | undefined
  annitictId:number | undefined
  shoboiTid:number | undefined
  wikiEn:string | undefined
  // time:Date | null
}

type character = {
  // characterId:number
  castId:string
  characterName:string
  characterImage:string
  // characterImageUrl?:string
}

type character2 = {
  // characterId:number
  castId:string
  characterName:string
  // characterImageUrl?:string
}

type episord = {
  episordNumber:number
  episordTittle:string
  episordArasuzi:string
  episordImageUrl:string
  episordTime:Date | null
  episordReleaseDate:Date | null
}


export const execProductCreate = (product:product,genresArray:string[],formatsArray:string[],characterMiddleData:character[],studiosArray:string[],staffMiddle:character2[],episord:episord[]) => {
  return client.post(`/products/`,{ 
    product:product,
    genresArray:genresArray,
    formatsArray:formatsArray,
    characterMiddleData:characterMiddleData,
    studiosArray:studiosArray,
    staffMiddle:staffMiddle,
    episord:episord
  })
}

// ----------------

export const execProductEditSetup = (id:number) => {  
return client.get(`/products/edit1`,{
  params:{
    id:id
  }
})

}

export const execProductUpdate = (id:number,product:product,genresArray:string[],formatsArray:string[],characterMiddleData:character[],studiosArray:string[],staffMiddle:character2[],episord:episord[])=> {
  return client.patch(`/products/${id}`,{ 
    product:product,
    genresArray:genresArray,
    formatsArray:formatsArray,
    characterMiddleData:characterMiddleData,
    studiosArray:studiosArray,
    staffMiddle:staffMiddle,
    episord:episord
  })
}

// search


// export const execAdminSearchProduct = (title:string,finished:number|undefined,seasons:string[],years:string[])=> {
export const execAdminSearchProduct = (data:any,page:number)=> {
  return client.get(`/admin/products`,{ 
    params:{
      q:data,
      page:page
      // q:{
      //   title_cont:title,
      //   finished_true:finished,
      //   year_season_seasons_id_in:seasons,
      //   year_season_years_id_in:years
      // }
      }
      ,paramsSerializer: function(data) {
        return qs.stringify(data, {arrayFormat: 'brackets'})
      }
  })
}



export const execAdminSetYears = ()=> {
  return client.get(`/admin/products/setup`,{ 
    params:{
      }
  })
}

export const execPublishedAll = (number:number,years:string,seasons:string) =>{
  return client.patch(`/admin/products/published`,{ 
    // params:{
      number:number,
      year:years,
      season:seasons
    // }
  })
}

export const execPublishedOne = (id:number,number:number)=>{
  return client.patch(`/admin/products/published_one`,{ 
    number:number,
    id:id
  })
}
