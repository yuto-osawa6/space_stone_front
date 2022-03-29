import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';

// export type todoGenresDataId={
//   genres_id:string
//   // genres_name_change:string
// }

export type todoGenresData = {
  janls_id_in: string[]
  // janls_name:string[]
}

// export type todoGenresData2 = {
//   janls_id_change:string
// }


// export type SearchProductsData = {
//   // id: number;
//   title_cont: string;
//   janls_id_in:string[];
  
// };


// export type tgd = todoGenresDataId[]

// export const arrayGenres:string[]=[
//   ""
// ]

export interface pussingtodoGenresData extends Action {
  type: typeof ActionTypes.todoGenres;
  payload: { 
    id:string
  };
}

export interface deletingtodoGenresData extends Action {
  type: typeof ActionTypes.deletetodoGenres;
  payload: { 
    id:string
  };
}

export interface deletingtodoGenresDataOne extends Action{
  type: typeof ActionTypes.deletetodoGenresOne
  payload:{
    id:string
  };
}

export interface deletingtodoGenresDataAll extends Action{
  type: typeof ActionTypes.deletetodoGenresAll
  payload:{
  };
}

export interface deletingtodoGenresDataExceptOne extends Action{
  type: typeof ActionTypes.deletetodoGenresExceptOne
  payload:{
    id:string
  };
}

export type todoGenresDataTypes = pussingtodoGenresData | deletingtodoGenresData | deletingtodoGenresDataOne | deletingtodoGenresDataAll | deletingtodoGenresDataExceptOne



