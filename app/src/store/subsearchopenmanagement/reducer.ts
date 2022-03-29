import { ActionTypes } from "store/actionTypes";
import { OpenCloseManegementSubSearchData, OpenCloseManegementSubSearchType } from "./types";

const initialState:OpenCloseManegementSubSearchData = {
  open:false
}


export const SettiongOpenCloseManegementSubSearchReducer = (state=initialState, action:OpenCloseManegementSubSearchType)=> {
  switch (action.type) {
    case ActionTypes.OpenSubSearch:
      
      return {
        open:action.payload.open
      };
    default:
      return state;
  }

};