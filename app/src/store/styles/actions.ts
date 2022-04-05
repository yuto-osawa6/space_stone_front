import { ActionTypes } from '../actionTypes';
import { SettiongStylesData, STD } from './types';
export interface set  {
  id:number
  name:string

}


export const actionSettingStylesData = (styles2:STD): SettiongStylesData => {

  return {
    type: ActionTypes.setStyles,
    styles:styles2
  };
};

// export const deleteTodoAction = (genres:SGD2): SettingGenresDatetypes => {
//   return {
//     type: ActionTypes.setFFF,
//     // payload: {
//       genres:genres
//     // },
//   };
// };