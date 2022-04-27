import { ActionTypes } from "@/store/actionTypes";
import { SubSearchTimeDataTypes } from "./types";



export const SettingTimeSearchAction = (item1: string,item2:string,timerange:number[]):SubSearchTimeDataTypes=> {
  return {
    type: ActionTypes.DuringSearch,
    payload: {
      time_gteq:item1,
      time_lteq:item2,
      time_range:timerange
    },
  };
};

export const DestroyTimeSearchAction = ():SubSearchTimeDataTypes=> {
  return {
    type: ActionTypes.DuringSearchDestroy,
    payload: {
      // year2_gteq:year_gteq,
      // year2_lteq:year_lteq
    },
  };
};