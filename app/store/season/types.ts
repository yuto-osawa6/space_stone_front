import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';



export type SubSearchSeasonData = {
  season_gteq: number | string
  season_lteq: number | string
}

export interface SubSearchSeasonType extends Action {
  type: typeof ActionTypes.SeasonSearch
  payload: { 
    season_gteq: number| string
    season_lteq: number| string
  };
}

export interface DeleteSubSearchSeasonType extends Action {
  type: typeof ActionTypes.SeasonSearchDestroy
  payload: { 
    // year_gteq: Date 
    // year_lteq: Date
  };
}

export type SubSearchSeasonDataTypes = SubSearchSeasonType | DeleteSubSearchSeasonType


