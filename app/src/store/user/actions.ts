import { User } from '@/interfaces/user';
import { ActionTypes } from '../actionTypes';
import { userDataTypes} from './types';



export const userLoginAction = (login:boolean,user:User):userDataTypes => {
  return {
    type: ActionTypes.user,
    payload: {
      login:login,
      user:user
    },
  };
};

export const updateNicknameAction = (user:User,nickname:string):userDataTypes => {
  return {
    type: ActionTypes.updateNickName,
    payload: {
      nickname:nickname,
      user:user  
    },
  };
};

export const updateBacgroundImageAction = (user:User,image:string):userDataTypes => {
  return {
    type: ActionTypes.updateBackgriundImage,
    payload: {
      image:image,
      user:user  
    },
  };
};



export const updateOverviewAction = (user:User,overview:string):userDataTypes => {
  return {
    type: ActionTypes.updateOverview,
    payload: {
      overview:overview,
      user:user  
    },
  };
};