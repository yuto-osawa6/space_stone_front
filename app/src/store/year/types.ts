import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';



export type SubSearchYearData = {
  // year2_gteq: string
  // year2_lteq: string
  years:{
  year_season_years_year_gteq:string
  year_season_years_year_lteq:string
  }
  checked:boolean
}

export interface SubSearchYearType extends Action {
  type: typeof ActionTypes.YearSearch;
  payload: { 
    year2_gteq: string
    year2_lteq: string
  };
}

export interface DeleteSubSearchYearType extends Action {
  type: typeof ActionTypes.YearSearchDestroy;
  payload: { 
    // year_gteq: Date 
    // year_lteq: Date
  };
}

export type SubSearchYearDataTypes = SubSearchYearType | DeleteSubSearchYearType


