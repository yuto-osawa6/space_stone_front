import { Article } from "@/interfaces/article";
import { ActionTypes } from "@/store/actionTypes";
import { ArticleDataTypes } from "./types";

export const SelectiongArticleDataAction = (article:Article):ArticleDataTypes => {
  return {
    type: ActionTypes.selectedArticle,
    payload: {
      article:article
    },
  };
};

export const DeletingArticleDataAction = ():ArticleDataTypes => {
  return {
    type: ActionTypes.deleteArticle,
    payload: {
    },
  };
};