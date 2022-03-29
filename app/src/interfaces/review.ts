import { product } from "./product";
import { User } from "./user";

export interface review {
  id:number
  productId:number
  userId:number
  discribe:string
  content:string
  reviewProduct:product
  reviewUser:User
  likeReviews:like_review[]
  user:User
  updatedAt:Date
  reviewEmotions:emotions[]
  questions:questions[]
  title:string
  episordId:number
  // return:boolean
}
type emotions = {
  id:number
  emotion:string
}
type questions = {
  id:number
  question:string
}

export interface like_review {
  id:number
  goodbad:number
  userId:number
}

export interface review_comments {
  id:number
  comment:string
  updatedAt:Date
  likeComment:[{
    id:number
    userId:number
    goodbad:number
  }]
  returnComment:[{
    id:number
    userId:number
    comment:string
    commentReviewId: number
    return:number
  }]
  returnJugde:boolean
  user:User
}

// 

export interface return_review_comments {
  id :number
  commentReviewId: number
  comment: string
  return:number
  userId:number
  updatedAt:Date
  reply:boolean

    
  likeReturnCommentReviews:[{
    id:number
    userId:number
    goodbad:number
  }]
  user:User
  returnReturn:{
    nickname:string
    }

}

export interface like_return_comment {
  id:number
  goodbad:number
}