import { ActionTypes } from "store/actionTypes";
import { LeftThreadDataTypes } from "./types";

type LeftsReview= {
  selectSort : number | null
}

const initialState:LeftsReview = {
  selectSort:null
}


export const SettingLeftThreadReducer = (state=initialState, action:LeftThreadDataTypes):LeftsReview => {
  switch (action.type) {
    case ActionTypes.NavigateLeftThreadData:
      
      return {
        selectSort : action.payload.selectSort
      }
    
    case ActionTypes.DeleteLeftThread:
      // doneyet return state 副反応注意
      return state
  
    default:
      const _ : never = action
      return state;
  }
};
