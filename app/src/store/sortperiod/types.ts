import { Action } from 'redux';
import { ActionTypes } from "@/store/actionTypes"

export type SortPeriodData = {
  periodnumber:number
  month:Date|undefined
  selectnumber:number
}

export interface setSortPeriodType extends Action {
  type: typeof ActionTypes.setSortPeriod
  payload: { 
    periodnumber:number
    month:Date|undefined
    selectnumber:number
  };
}

export interface resetSortNumberTypes extends Action {
  type: typeof ActionTypes.resetSortPeriod
  payload: { 
    
  
  };
}

export type SortPeriodDataTypes = setSortPeriodType | resetSortNumberTypes


