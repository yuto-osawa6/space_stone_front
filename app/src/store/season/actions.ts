import { ActionTypes } from "store/actionTypes";
import { SubSearchSeasonDataTypes } from "./types";



export const SettingSeasonSearchAction = (item1: number,item2: number):SubSearchSeasonDataTypes=> {
  return {
    type: ActionTypes.SeasonSearch,
    payload: {
      season_gteq:item1,
      season_lteq:item2
    },
  };
};

export const DestroySeasonSearchAction = ():SubSearchSeasonDataTypes=> {
  return {
    type: ActionTypes.SeasonSearchDestroy,
    payload: {
      // year2_gteq:year_gteq,
      // year2_lteq:year_lteq
    },
  };
};