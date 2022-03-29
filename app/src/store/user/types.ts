import { User } from 'interfaces/user';
import { Action } from 'redux';
import { ActionTypes } from '../actionTypes';

export type UserData = {
  login:boolean
  user:User
}



export interface userDataType extends Action {
  type: typeof ActionTypes.user;
  payload: { 
    login:boolean
    user:User
  };
}

export interface userUpdateNicknameDataTypes extends Action {
  type: typeof ActionTypes.updateNickName;
  payload: {
    nickname:string
    user:User
  };
}

export interface userUpdateBackgroundDataTypes extends Action {
  type: typeof ActionTypes.updateBackgriundImage;
  payload: {
    image:string
    user:User
  };
}

export interface userUpdateOverviewDataTypes extends Action {
  type: typeof ActionTypes.updateOverview;
  payload: {
    overview:string
    user:User
  };
}



export type userDataTypes =  userDataType | userUpdateNicknameDataTypes | userUpdateBackgroundDataTypes | userUpdateOverviewDataTypes



