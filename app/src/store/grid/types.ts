import { Action } from 'redux';
import { ActionTypes } from '../actionTypes';

export type GridData = {
  // s:{
    grid:string
  // }
}

export interface GridDataTypes extends Action {
  type: typeof ActionTypes.grid;
  payload: { 
    grid:string
  };
}



// export type todoStylesDataTypes = pussingtodoStylesData  | deletingtodoStylesDataAll 



