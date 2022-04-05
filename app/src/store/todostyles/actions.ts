import { ActionTypes } from '../actionTypes';
import { todoStylesDataTypes } from './types';



export const pussingtodoStylesDataAction = (id:string):todoStylesDataTypes => {
  return {
    type: ActionTypes.todoStyles,
    payload: {
      id:id
    },
  };
};

// export const deletingtodoGenresDataAction = (id:string):todoStylesDataTypes => {
//   return {
//     type: ActionTypes.deletetodoStyles,
//     payload: {
//       id:id
//     },
//   };
// };

export const deletingtodoStylesDataAllAction = ():todoStylesDataTypes => {
  return {
    type: ActionTypes.deletetodoStylesAll,
    payload: {

    },
  };
};