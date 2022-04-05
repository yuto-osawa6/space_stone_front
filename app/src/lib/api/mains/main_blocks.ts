import { product } from "interfaces/product"
import client from "../../client/client"

export const execNewNetflixMainHandler = () => {
  return client.get(`/mainblocks/mains/new_netflix`,{ 

  })
}

export const execPickUpMainHandler = () => {
  return client.get(`/mainblocks/mains/pickup`,{ 

  })
}
export const execNewMessageHandler = (active:number,page:number) => {
  return client.get(`/mainblocks/mains/new_message`,{ 
    params:{
      active:active,
      page:page
    }
  })
}

export const execCalendarHandler = () => {
  return client.get(`/mainblocks/mains/calendar`,{ 
    // params:{
    //   active:active,
    //   page:page
    // }
  })
}

export const execWorldClassHandler = () => {
  return client.get(`/mainblocks/mains/worldclass`,{ 
  })
}

export  const execToptensHandler = () => {
  return client.get(`/mainblocks/mains/toptens`,{
  })
}

export const execMainPopularReviewAndThreadsHandler = () => {

  return client.get('/mainblocks/mains/populur_rt',{
    
  })
}

// 2.1
export const execWeeklyRanking = () => {
  return client.get("mainblocks/mains/ranking",{
   
  })
}

export const execVoteWeeklyRanking = (product_id:number,episordIds: number[]) => {
  return client.post("mainblocks/mains/vote",{
    product_id:product_id,
    episordIds: episordIds
  })
}
type tiers= {
  group:number
  product:number[]
}

// create Tier
export const execCreateTierHandler = (groupProduct:tiers[],season:string,user_id:number) => {
  return client.post("mainblocks/mains/create_tier",{
    groupProduct:groupProduct,
    season:season,
    user_id:user_id
  })
}

// export const execGetThisSeasonTier = () => {
//   return client.get("mainblocks/mains/this_season_tier",{

//   })
// }

export const execGetUserTier  = (user_id:number,current_number:number) => {
    return client.get("mainblocks/mains/user_this_season_tier",{
      params:{
      // season:season,
      user_id:user_id,
      current_number:current_number
      }
    })
  }

  export const execGetUserTierUserPage  = (user_id:number,current_number:number) => {
    return client.get("mainblocks/mains/user_this_season_tier_user_page",{
      params:{
      // season:season,
      user_id:user_id,
      current_number:current_number
      }
    })
  }


export const execGetUserTier2  = (user_id:number,year:number,kisetsu:number) => {
  return client.get("mainblocks/mains/get_user_tier_2",{
    params:{
    // season:season,
    user_id:user_id,
    // current_number:current_number,
    year:year,
    kisetsu:kisetsu
    }
  })
}

export const execUpdateTierList = (user_id:number,current_number:number) => {
  return client.get("mainblocks/mains/update_tier_list",{
    params:{
      user_id:user_id,
      current_number:current_number
    }
  })

}