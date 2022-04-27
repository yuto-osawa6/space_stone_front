import { Action } from "redux";
import { ActionTypes } from "@/store/actionTypes";

type Message = {
  title:string
  select:number
}

export type MessageData = {
  message:Message[]
}

export interface PussingMessageData extends Action {
  type: typeof ActionTypes.pusshingMessage;
  payload: { 
    message:Message
  };
}

export interface DeletingMessageData extends Action {
  type: typeof ActionTypes.deleteingMessage;
  payload: { 
  };
}

export interface SelectDeleteMessageDataOne extends Action{
  type: typeof ActionTypes.selectDeleteMessage
  payload:{
    index:number
  };
}

export type MessageDataTypes = PussingMessageData | DeletingMessageData | SelectDeleteMessageDataOne