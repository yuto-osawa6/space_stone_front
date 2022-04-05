import { ActionTypes } from "store/actionTypes";
import { SortPeriodData, SortPeriodDataTypes } from "./types";

const initialState:SortPeriodData = {
  periodnumber:1,
  month:undefined,
  selectnumber:0
};


export const SortPeriodReducer = (state = initialState, action:SortPeriodDataTypes):SortPeriodData => {
  switch (action.type) {
    case ActionTypes.setSortPeriod:
      return {
          periodnumber:action.payload.periodnumber,
          month:action.payload.month,
          selectnumber:action.payload.selectnumber
        }
    case ActionTypes.resetSortPeriod:

      return {
          periodnumber:0,
          month:undefined,
          selectnumber:0
        }
    

    default:
      const _ : never = action;
      return state;
  }
};