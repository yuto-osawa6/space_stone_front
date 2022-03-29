import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';

// type SetGenresData = {
//   genres:[
  
//   ]
// };


// export type SGD = SetGenresData[];

type SetGenresData = {
  id:number
  name:string
}

export type SGD = {
  genres:SetGenresData[]
  loaded:boolean
};
export type SGD2 = SetGenresData[]


export interface SettiongGenresData extends Action {
  type: typeof ActionTypes.setGenres
  genres:SGD2
  // loaded:boolean
}

