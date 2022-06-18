import { acsesses, emotionList, product, productReviews, productScores, productThreads, stats, userReview } from "@/interfaces/product";
import { review } from "@/interfaces/review";
import { User, UserShow } from "@/interfaces/user";
import React from "react";

type chatList = {
  created_at: string
  id: number
  message: string
  product_id: number
  user_id: number
}


export const Productshowcontext = React.createContext({} as {
  product:product | undefined
  switchnumber: number | undefined
  // stats:{ [key: string]: number }
  acsesses: acsesses | undefined

  userReviews: userReview[]
  setUserReviews: React.Dispatch<React.SetStateAction<userReview[]>>
  productReviews: productReviews[]
  setProductReviews: React.Dispatch<React.SetStateAction<productReviews[]>>
  productThreads: productThreads[]
  setProductThreads: React.Dispatch<React.SetStateAction<productThreads[]>>
  emotionLists: emotionList[]
  setEmotionLists: React.Dispatch<React.SetStateAction<emotionList[]>>

  chatList: chatList[]
  setChatList : React.Dispatch<React.SetStateAction<chatList[]>>
  Channel: any
  productScores: productScores[]
  setProductScores:React.Dispatch<React.SetStateAction<productScores[]>>
  score: number | null
  setScore:React.Dispatch<React.SetStateAction<number | null>>

  openscore: boolean
  setOpenscore: React.Dispatch<React.SetStateAction<boolean>>
  // score:
  scoreid:number | null
  setScoreid:React.Dispatch<React.SetStateAction<number|null>>
  stats: number[]
  setStats:React.Dispatch<React.SetStateAction<number[]>>
  scoreaverage:string
  setScoreaverage:React.Dispatch<React.SetStateAction<string>>
  userScore : productScores | undefined
  setUserScore: React.Dispatch<React.SetStateAction<productScores | undefined>>

  }
  );
export const OpenContext = React.createContext({} as {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  })

  export const OpenScoreContext = React.createContext({} as {
    // product_id:number | undefined
    openscore: boolean
    setOpenscore: React.Dispatch<React.SetStateAction<boolean>>
    // score:
    score:number | null
    setScore:React.Dispatch<React.SetStateAction<number|null>>
    scoreid:number | null
    setScoreid:React.Dispatch<React.SetStateAction<number|null>>

    stats:number[]
    setStats:React.Dispatch<React.SetStateAction<number[]>>

    scoreaverage:string
    setScoreaverage:React.Dispatch<React.SetStateAction<string>>

  })

  export const OpenReviewContext = React.createContext({} as {
    // product_id:number | undefined
    openreview: boolean
    setOpenreview: React.Dispatch<React.SetStateAction<boolean>>

  })
  // openthered,setOpenthered

  export const OpenTheredContext = React.createContext({} as {
    // product_id:number | undefined
    openthered: boolean
    setOpenthered: React.Dispatch<React.SetStateAction<boolean>>

  })

  export const MainProduct = React.createContext({} as {
    product:product
  })

  export const ViewProductContext = React.createContext({} as {
    viewproduct:product|undefined
    setViewproduct:React.Dispatch<React.SetStateAction<product|undefined>>
    useraction:boolean
    setUseraction: React.Dispatch<React.SetStateAction<boolean>>
    viewProductV2:product[]
    setViewProductV2: React.Dispatch<React.SetStateAction<product[]>>
    products:product[]
  })
// reviews
  export const OpenReviewCommentContext = React.createContext({} as {
    // product_id:number | undefined
    openReviewComment: boolean
    setOpenReviewComment: React.Dispatch<React.SetStateAction<boolean>>

  })

  export const OpenReturnReviewCommentContext = React.createContext({} as {
    openReturnReviewComment: boolean
    setOpenReturnReviewComment: React.Dispatch<React.SetStateAction<boolean>>

  })

// user

export const UserShowContext = React.createContext({} as {
  user:UserShow
})