import { ActionTypes } from "@/store/actionTypes";
import { SubSearchYearDataTypes } from "./types";



export const SettingYearSearchAction = (year2_gteq: string,year2_lteq: string):SubSearchYearDataTypes=> {
  return {
    type: ActionTypes.YearSearch,
    payload: {
      year2_gteq:year2_gteq,
      year2_lteq:year2_lteq
    },
  };
};

export const DestroyYearSearchAction = ():SubSearchYearDataTypes=> {
  return {
    type: ActionTypes.YearSearchDestroy,
    payload: {
      // year2_gteq:year_gteq,
      // year2_lteq:year_lteq
    },
  };
};