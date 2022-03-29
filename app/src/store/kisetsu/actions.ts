import { ActionTypes } from '../actionTypes';
import { todoKisetsuDataTypes } from './types';

type Kisetsu = {
  id:number
  name:string
}


export const pussingtodoKisetsuDataAction = (id:string,kisetsu:Kisetsu):todoKisetsuDataTypes => {
  return {
    type: ActionTypes.todoKisetsu,
    payload: {
      id:id,
      kisetsu:kisetsu
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

export const deletingtodoKisetsuDataAllAction = ():todoKisetsuDataTypes => {
  return {
    type: ActionTypes.deletetodoKisetsuAll,
    payload: {

    },
  };
};