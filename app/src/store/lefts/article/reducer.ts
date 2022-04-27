import { ActionTypes } from "@/store/actionTypes";
import { LeftArticleDataTypes } from "./types";


 type LeftsArticle = {
  weekormonth : number | null
}

const initialState:LeftsArticle = {
  weekormonth:null
}


export const SettingLeftArticleReducer = (state=initialState, action:LeftArticleDataTypes):LeftsArticle => {
  switch (action.type) {
    case ActionTypes.NavigateLeftArticle:
      
      return {
        weekormonth:action.payload.weekormonth
      }
    
    case ActionTypes.DeleteLeftArticle:
      // doneyet return state 副反応注意
      return state
  
    default:
      const _ : never = action
      return state;
  }
};
