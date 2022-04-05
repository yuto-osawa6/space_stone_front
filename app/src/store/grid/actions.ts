import { ActionTypes } from '../actionTypes';
import { GridDataTypes } from './types';



export const GridAction = (grid:string):GridDataTypes => {
  return {
    type: ActionTypes.grid,
    payload: {
      grid:grid
    },
  };
};

