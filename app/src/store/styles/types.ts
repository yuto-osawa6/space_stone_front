import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';

type SetStylesData = {
  id:number
  name:string
}

// export type SGD = {
//   genres:SetStylesData[]
// };
export type STD = SetStylesData[]

export type STDR = {
  styles:SetStylesData[]
};

export interface SettiongStylesData extends Action {
  type: typeof ActionTypes.setStyles
  styles:STD
}
