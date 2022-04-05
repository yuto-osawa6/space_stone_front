import { Cast } from "interfaces/search";
import { Action } from "redux";
import { ActionTypes } from "store/actionTypes";

export type CastsData = {
  castids:{
  casts_id_in: string[]
  }
  // janls_name:string[]
  cast:Cast[]
}
// 


export interface PussingCastsData extends Action {
  type: typeof ActionTypes.Casts;
  payload: { 
    id:string
    cast:Cast
  };
}

export interface DeletingCastsData extends Action {
  type: typeof ActionTypes.DeleteCasts;
  payload: { 
    id:string
    cast:Cast
  };
}

export interface DeletingCastsDataOne extends Action{
  type: typeof ActionTypes.DeleteCastsOne
  payload:{
    id:string
    cast:Cast
  };
}

export interface DeletingCastsDataAll extends Action{
  type: typeof ActionTypes.DeleteCastsAll
  payload:{
  };
}

export interface DeletingCastsDataExceptOne extends Action{
  type: typeof ActionTypes.DeleteCastsExceptOne
  payload:{
    id:string
    cast:Cast
  };
}

export type CastsDataTypes = PussingCastsData | DeletingCastsData | DeletingCastsDataOne | DeletingCastsDataAll | DeletingCastsDataExceptOne
