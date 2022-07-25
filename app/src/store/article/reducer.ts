import { Article } from '@/interfaces/article';
import { IniProductData } from '@/store/product/types';
import { SearchProductsData } from '@/store/search/types';
import { ActionTypes } from '../actionTypes';
import {ArticleDataTypes} from './types';




const initialState:Article = {
  id:0,
  title:"",
  content:"",
  weekormonth:false,
  articleProducts:[IniProductData],
  hashtagArticles:[]
}


export const SettingArticleReducer = (state=initialState, action:ArticleDataTypes):Article => {
  switch (action.type) {
    case ActionTypes.selectedArticle:
      
      return action.payload.article
    
    case ActionTypes.deleteArticle:
      // doneyet return state 副反応注意
      return state
  
    default:
      const _ : never = action
      return state;
  }
};
