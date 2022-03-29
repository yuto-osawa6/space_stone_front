import { Action } from 'redux';
import { ActionTypes } from '../actionTypes';

export type SearchProductsData = {
  title_cont: string;
};

interface ChangingProductsData extends Action {
  type: typeof ActionTypes.searchProductsTexts;
  payload: { 
    title_cont: string,
  };
}

interface clearTitle extends Action {
  type: typeof ActionTypes.searchClearTitle;
  payload: { 
  };
}

// interface pushingGenresData extends Action {
//   type: typeof ActionTypes.pussingGenresData;
//   payload: { 
//     id:number
//   };
// }
// export type SearchProductsActionTypes = ChangingProductsData | StylingProductsData | pushingGenresData
export type SearchProductsActionTypes = ChangingProductsData | clearTitle
