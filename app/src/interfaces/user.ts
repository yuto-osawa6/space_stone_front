import { genre, product } from "./product";
import { review } from "./review";
import { thread } from "./thread";

export interface User {
  id:number
  nickname:string
  image:string
  administratorGold:boolean
  overview:string
  provider:string
  backgroundImage:string
}

export interface UserShow{
  id:number
  nickname:string
  image:string
  administratorGold:boolean
  overview:string
  provider:string
  backgroundImage:string
  likeProducts:product[]
  reviewProducts:review[]
  scoreProducts:product[]
  threadProduct:thread[]
  likeGenres:genre[]
  score:number[]
  emotions:emotions[]
  emotionCount:emotionCount
  emotionAllCount: number
  scoreEmotions:emotions[]
  scoreEmotionCount:emotionCount
  scoreEmotionAllCount: number
  tier:tier[]

}

type tier = {
  id: number
  product:product
  tier:number
  userId: number
  aliceT: number
}


type tierProduct = {
  id:number
  avg:string
  imageUrl:string
  title:string
}

type emotions= {
  id: number
  emotion: string
}

type emotionCount = {
  [id:number]:number
}