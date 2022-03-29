import { Action } from 'redux';
import { ActionTypes } from '../actionTypes';

export type SortData = {
  // s:{
    s:string
  // }
}

export interface sortDataTypes extends Action {
  type: typeof ActionTypes.sort;
  payload: { 
    sort:string
  };
}



// export type todoStylesDataTypes = pussingtodoStylesData  | deletingtodoStylesDataAll 



