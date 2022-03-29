import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';



export type SubSearchTimeData = {
  // time_gteq: Date | string
  // time_lteq: Date | string
  times:{
  time_gteq: string
  time_lteq: string
  }
  time_range: number[]
}

export interface SubSearchTimeType extends Action {
  type: typeof ActionTypes.DuringSearch
  payload: { 
    time_gteq: string
    time_lteq: string
    time_range: number[]
  };
}

export interface DeleteSubSearchTimeType extends Action {
  type: typeof ActionTypes.DuringSearchDestroy
  payload: { 
    // year_gteq: Date 
    // year_lteq: Date
  };
}

export type SubSearchTimeDataTypes = SubSearchTimeType | DeleteSubSearchTimeType


