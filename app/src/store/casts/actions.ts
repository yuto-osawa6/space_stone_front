import { Cast } from 'interfaces/search';
import { ActionTypes } from '../actionTypes';
import { CastsDataTypes } from './types';



export const PussingCastsDataAction = (id:string,Cast:Cast):CastsDataTypes => {
  return {
    type: ActionTypes.Casts,
    payload: {
      id:id,
      cast:Cast
    },
  };
};

export const DeletingCastsDataAction = (id:string,Cast:Cast):CastsDataTypes => {
  return {
    type: ActionTypes.DeleteCasts,
    payload: {
      id:id,
      cast:Cast
    },
  };
};

export const DeletingCastsDataOneAction = (id:string,Cast:Cast):CastsDataTypes => {
  return {
    type: ActionTypes.DeleteCastsOne,
    payload: {
      id:id,
      cast:Cast
    },
  };
};

export const DeletingCastsDataAllAction = ():CastsDataTypes=> {
  return {
    type: ActionTypes.DeleteCastsAll,
    payload: {

    },
  };
};

export const DeletingCastsDataExceptOneAction = (id:string,Cast:Cast):CastsDataTypes => {
  return {
    type: ActionTypes.DeleteCastsExceptOne,
    payload: {
      id:id,
      cast:Cast
    },
  };
};