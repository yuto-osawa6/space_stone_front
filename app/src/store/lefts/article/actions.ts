import { Article } from "interfaces/article";
import { ActionTypes } from "store/actionTypes";
import { LeftArticleDataTypes } from "./types";

export const NavigatingLeftArticleDataAction = (item:number | null):LeftArticleDataTypes => {
  return {
    type: ActionTypes.NavigateLeftArticle,
    payload: {
      weekormonth:item
    },
  };
};

export const DeletingArticleDataAction = ():LeftArticleDataTypes => {
  return {
    type: ActionTypes.DeleteLeftArticle,
    payload: {
    },
  };
};