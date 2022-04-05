import { product } from "./product";

export interface Article {
  id:number
  title:string
  content:string
  articleProducts:product[]
  weekormonth:boolean
}