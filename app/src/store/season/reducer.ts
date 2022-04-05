import { ActionTypes } from '../actionTypes';
import { SubSearchSeasonData, SubSearchSeasonDataTypes } from './types';



const initialState:SubSearchSeasonData = {
  season_gteq: "",
  season_lteq: ""
};


export const SeasonSearchReducer = (state = initialState, action:SubSearchSeasonDataTypes):SubSearchSeasonData => {
  switch (action.type) {
    case ActionTypes.SeasonSearch:
      return {
        season_gteq: action.payload.season_gteq,
        season_lteq: action.payload.season_lteq
        }
    case ActionTypes.SeasonSearchDestroy:

      return {
        season_gteq: "",
        season_lteq: ""
        }
    

    default:
      const _ : never = action;
      return state;
  }
};