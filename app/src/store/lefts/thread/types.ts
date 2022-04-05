import { Action } from "redux";
import { ActionTypes } from "store/actionTypes";

export interface NavigateLeftThreadData extends Action {
  type: typeof ActionTypes.NavigateLeftThreadData;
  payload: { 
    selectSort:number | null
  };
}

export interface DeletingLeftThreadData extends Action {
  type: typeof ActionTypes.DeleteLeftThread;
  payload: { 
  };
}

export type LeftThreadDataTypes = NavigateLeftThreadData| DeletingLeftThreadData
