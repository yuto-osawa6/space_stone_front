import { ActionTypes } from "@/store/actionTypes";
import { SortPeriodData, SortPeriodDataTypes } from "./types";

export const SettingSortPeriodAction = (number:number,month:Date|undefined,selectnumber:number):SortPeriodDataTypes=> {
  return {
    type: ActionTypes.setSortPeriod,
    payload: {
     periodnumber:number,
     month:month,
     selectnumber:selectnumber
    },
  };
};

export const ResetSortPeriodAction = ():SortPeriodDataTypes=> {
  return {
    type: ActionTypes.resetSortPeriod,
    payload: {

    },
  };
};