import { Article } from "@/interfaces/article";
import { Cast } from "@/interfaces/search";
import { Action } from "redux";
import { ActionTypes } from "@/store/actionTypes";

// export type ArticleData = {
  
// }
// 


export interface PussingArticleData extends Action {
  type: typeof ActionTypes.selectedArticle;
  payload: { 
    article:Article
  };
}

export interface DeletingArticleData extends Action {
  type: typeof ActionTypes.deleteArticle;
  payload: { 
  };
}

export type ArticleDataTypes = PussingArticleData | DeletingArticleData
