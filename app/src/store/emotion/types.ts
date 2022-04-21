import { Cast } from "@/interfaces/search";
import { Action } from "redux";
import { ActionTypes } from "@/store/actionTypes";

// type Studios = {
//   id:number
//   company:string
// }

export type emotionData = {
  sortEmotionId:string
}


export interface addEmotionData extends Action {
  type: typeof ActionTypes.emotionSort
  payload: { 
    id:string
  };
}

export interface DeletingEmotionData extends Action {
  type: typeof ActionTypes.deleteEmotionSort
  payload: { 
  };
}
export type emotionsDataTypes = addEmotionData | DeletingEmotionData