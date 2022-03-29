import { product } from "./product";

export interface thread {
  id:number
  productId:number
  userId:number
  discribe:string
  content:string
  threadProduct:product
}