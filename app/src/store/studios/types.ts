import { Cast } from "interfaces/search";
import { Action } from "redux";
import { ActionTypes } from "store/actionTypes";

type Studios = {
  id:number
  company:string
}

export type StudiosData = {
  studiosids:{
    studios_id_in: string[]
  }
  studio:Studios[]
}


export interface PussingStudiosData extends Action {
  type: typeof ActionTypes.Studios;
  payload: { 
    id:string
    studio:Studios
  };
}

export interface DeletingStudiosData extends Action {
  type: typeof ActionTypes.DeleteStudios;
  payload: { 
    id:string
    studio:Studios
  };
}

export interface DeletingStudiosDataOne extends Action{
  type: typeof ActionTypes.DeleteStudiosOne
  payload:{
    id:string
    studio:Studios
  };
}

export interface DeletingStudiosDataAll extends Action{
  type: typeof ActionTypes.DeleteStudiosAll
  payload:{
  };
}

export interface DeletingStudiosDataExceptOne extends Action{
  type: typeof ActionTypes.DeleteStudiosExceptOne
  payload:{
    id:string
    studio:Studios
  };
}

export type StudiosDataTypes = PussingStudiosData | DeletingStudiosData | DeletingStudiosDataOne | DeletingStudiosDataAll | DeletingStudiosDataExceptOne