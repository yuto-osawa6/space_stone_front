import { product } from "./product";

export interface Article {
  id:number
  title:string
  content:string
  articleProducts:product[]
  weekormonth:boolean
  hashtagArticles:hash[]
}

type hash = {
  id:number
  name:string
}