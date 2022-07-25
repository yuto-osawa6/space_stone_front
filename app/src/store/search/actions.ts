import { ActionTypes } from '../actionTypes';
import { SearchProductsActionTypes } from './types';

export const addTodoAction = (title_count: string): SearchProductsActionTypes => {
  return {
    type: ActionTypes.searchProductsTexts,
    payload: {
      // id:ids,
      title_or_titleKa_or_titleEn_or_titleRo_cont: title_count,
    },
  };
};

// export const deleteTodoAction = (todoId: number): SearchProductsActionTypes => {
//   return {
//     type: ActionTypes.searchProductsStyles,
//     payload: {
//       id: todoId,
//     },
//   };
// };

// export const pussingGenresDataAction = (genresId: number): SearchProductsActionTypes => {
//   return {
//     type: ActionTypes.pussingGenresData,
//     payload: {
//       id: genresId,
//     },
//   };
// };


export const clearTitleAction = (): SearchProductsActionTypes => {
  return {
    type: ActionTypes.searchClearTitle,
    payload: {

    },
  };
};

