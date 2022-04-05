import { ActionTypes } from '../actionTypes';
import { SettiongGenresData, SGD2 } from './types';
export interface set  {
  id:number
  name:string

}


export const actionSettingGenresData = (genres:SGD2): SettiongGenresData => {

  return {
    type: ActionTypes.setGenres,
    genres:genres
    // loaded:loaded
  };
};
