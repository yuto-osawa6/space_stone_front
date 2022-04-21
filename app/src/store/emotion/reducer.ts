// import { EmotionItem } from '@/component/products/show/top/EmotionItem';
import { SearchProductsData } from '@/store/search/types';
import { ActionTypes } from '../actionTypes';
import { emotionData, emotionsDataTypes } from './types';
// import { SearchProductsActionTypes, SPD } from './types';
// import { todoKisetsuDataTypes, todoKisetsuData, emotionData} from './types';

// import {arrayGenres} from './types';

// type Kisetsu = {
//   id:number
//   name:string
// }


const initialState:emotionData={
  sortEmotionId:""
}

export const sortEmotionReducer = (state=initialState, action:emotionsDataTypes):emotionData=> {
  switch (action.type) {
    case ActionTypes.emotionSort:
      return {
      sortEmotionId:action.payload.id
      };
    case ActionTypes.deleteEmotionSort:

    return {
      sortEmotionId:""
    };
   
    default:
      const _ : never = action
      return state;
  }
};

