import { Action } from 'redux';
import { ActionTypes } from '../actionTypes';

type Kisetsu = {
  id:number
  name:string
}

export type todoKisetsuData = {
  kisetsusids:{
    year_season_seasons_id_eq: string
  }
  kisetsu:Kisetsu
}



export interface pussingtodoKisetsuData extends Action {
  type: typeof ActionTypes.todoKisetsu;
  payload: { 
    id:string
    kisetsu:Kisetsu
  };
}


export interface deletingtodoKisetsuDataAll extends Action {
  type: typeof ActionTypes.deletetodoKisetsuAll;
  payload: { 
  };
}

export type todoKisetsuDataTypes = pussingtodoKisetsuData  | deletingtodoKisetsuDataAll 


