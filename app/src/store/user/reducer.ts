import { SearchProductsData } from 'store/search/types';
import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import {UserData, userDataTypes} from './types';

// import {arrayGenres} from './types';



export const userInitialState:UserData={
  login:false,
  user:{
    id:0,
    administratorGold:false,
    image:"",
    nickname:"",
    overview:"",
    provider:"",
    backgroundImage:"",
  }
}

export const userReducer = (state=userInitialState, action: userDataTypes):UserData => {
  switch (action.type) {
    case ActionTypes.user:
      // state.styles_id_eq = action.payload.id
      return {
        login:action.payload.login,
        user:action.payload.user
      };
    case ActionTypes.updateNickName:
      return{
        login:true,
        user:{
          id:action.payload.user.id,
          administratorGold:action.payload.user.administratorGold,
          image:action.payload.user.image,
          nickname:action.payload.nickname,
          overview:action.payload.user.overview,
          provider:action.payload.user.provider,
          backgroundImage:action.payload.user.backgroundImage
        }
      } 
      case ActionTypes.updateBackgriundImage:
        return{
          login:true,
          user:{
            id:action.payload.user.id,
            administratorGold:action.payload.user.administratorGold,
            image:action.payload.user.image,
            nickname:action.payload.user.nickname,
            overview:action.payload.user.overview,
            provider:action.payload.user.provider,
            backgroundImage:action.payload.image
          }
        } 
      case ActionTypes.updateOverview:
        return{
          login:true,
          user:{
            id:action.payload.user.id,
            administratorGold:action.payload.user.administratorGold,
            image:action.payload.user.image,
            nickname:action.payload.user.nickname,
            overview:action.payload.overview,
            provider:action.payload.user.provider,
            backgroundImage:action.payload.user.backgroundImage
          }
        } 
    default:
      const _ : never = action
      return state;
  }
};

