import { ActionTypes } from "@/store/actionTypes";
import { LeftReviewDataTypes } from "./types";

type LeftsReview= {
  selectSort : number | null
}

const initialState:LeftsReview = {
  selectSort:null
}


export const SettingLeftReviewReducer = (state=initialState, action:LeftReviewDataTypes):LeftsReview => {
  switch (action.type) {
    case ActionTypes.NavigateLeftReviewData:
      
      return {
        selectSort : action.payload.selectSort
      }
    
    case ActionTypes.DeleteLeftReview:
      // doneyet return state 副反応注意
      return state
  
    default:
      const _ : never = action
      return state;
  }
};
