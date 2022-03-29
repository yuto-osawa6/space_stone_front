import { ActionTypes } from '../actionTypes';
import { emotionsDataTypes } from './types';
// import { SettiongGenresData2 } from './types';
// import { SettingGenresDatetypes2 } from './types';

// export interface set  {
//   id:number
//   name:string

// }




export const actionEmotionData = (id:string): emotionsDataTypes => {

  return {
    type: ActionTypes.emotionSort,
    payload: {
      id:id
    },
  };
};

export const actionDeleteEmotionData = (): emotionsDataTypes => {

  return {
    type: ActionTypes.deleteEmotionSort,
    payload: {

    },
  };
};