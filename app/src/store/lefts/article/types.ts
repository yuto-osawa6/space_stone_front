import { Article } from "interfaces/article";
import { Cast } from "interfaces/search";
import { Action } from "redux";
import { ActionTypes } from "store/actionTypes";

// export type ArticleData = {
  
// }
// 


export interface NavigateLeftArticleData extends Action {
  type: typeof ActionTypes.NavigateLeftArticle;
  payload: { 
    weekormonth:number | null
  };
}

export interface DeletingLeftArticleData extends Action {
  type: typeof ActionTypes.DeleteLeftArticle;
  payload: { 
  };
}

export type LeftArticleDataTypes = NavigateLeftArticleData | DeletingLeftArticleData
