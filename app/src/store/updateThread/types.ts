import { Action } from 'redux';
import { ActionTypes } from '../actionTypes';

export type UpdateThreadData = {
  update:boolean
}

export interface updateThreadDataTypes extends Action {
  type: typeof ActionTypes.updateThreadState;
  payload: { 
    update:boolean
  };
}
