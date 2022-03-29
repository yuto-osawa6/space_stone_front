import { ActionTypes } from '../actionTypes';
import { pussingtodoGenresData, todoGenresDataTypes } from './types';



export const pussingtodoGenresDataAction = (id:string):todoGenresDataTypes => {
  return {
    type: ActionTypes.todoGenres,
    payload: {
      id:id
    },
  };
};

export const deletingtodoGenresDataAction = (id:string):todoGenresDataTypes => {
  return {
    type: ActionTypes.deletetodoGenres,
    payload: {
      id:id
    },
  };
};

export const deletingtodoGenresDataOneAction = (id:string):todoGenresDataTypes => {
  return {
    type: ActionTypes.deletetodoGenresOne,
    payload: {
      id:id
    },
  };
};

export const deletingtodoGenresDataALLAction = ():todoGenresDataTypes => {
  return {
    type: ActionTypes.deletetodoGenresAll,
    payload: {

    },
  };
};

export const deletingtodoGenresDataExceptOneAction = (id:string):todoGenresDataTypes => {
  return {
    type: ActionTypes.deletetodoGenresExceptOne,
    payload: {
      id:id
    },
  };
};