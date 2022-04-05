import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';

type sf = {
  id:number
  name:string
}

export type SetGenresData2 = {
  genres:sf[]
};

export interface SettiongGenresData2 extends Action {
  type: typeof ActionTypes.setGenre
  genres:sf[]
}

