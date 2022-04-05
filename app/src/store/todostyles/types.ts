import { Action } from 'redux';
import { ActionTypes } from '../actionTypes';

export type todoStylesData = {
  styles_id_eq: string
  // janls_id_change:string
}



export interface pussingtodoStylesData extends Action {
  type: typeof ActionTypes.todoStyles;
  payload: { 
    id:string
  };
}

// export interface deletingtodoStylesData extends Action {
//   type: typeof ActionTypes.deletetodoStyles;
//   payload: { 
//     id:string
//   };
// }

export interface deletingtodoStylesDataAll extends Action {
  type: typeof ActionTypes.deletetodoStylesAll;
  payload: { 
  };
}

export type todoStylesDataTypes = pussingtodoStylesData  | deletingtodoStylesDataAll 



