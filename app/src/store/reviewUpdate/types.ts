import { Action } from 'redux';
import { ActionTypes } from '../actionTypes';

export type UpdateData = {
  update:boolean
}

export interface updateReviewDataTypes extends Action {
  type: typeof ActionTypes.updateReviewState;
  payload: { 
    update:boolean
  };
}
