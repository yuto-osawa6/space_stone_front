import { ActionTypes } from '../actionTypes';
import { sortDataTypes } from './types';



export const sortAction = (sort:string):sortDataTypes => {
  return {
    type: ActionTypes.sort,
    payload: {
      sort:sort
    },
  };
};

