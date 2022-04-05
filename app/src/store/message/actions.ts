
import { ActionTypes } from '../actionTypes';
import { MessageDataTypes} from './types';

type Message = {
  title:string
  select:number
}

export const pussingMessageDataAction = (message:Message):MessageDataTypes => {
  return {
    type: ActionTypes.pusshingMessage,
    payload: {
      message:message
    },
  };
};

export const deletingMessageDataAction = ():MessageDataTypes => {
  return {
    type: ActionTypes.deleteingMessage,
    payload: {
    },
  };
};

export const selectDeletingMessageDataAction = (index:number):MessageDataTypes => {
  return {
    type: ActionTypes.selectDeleteMessage,
    payload: {
      index:index
    },
  };
};