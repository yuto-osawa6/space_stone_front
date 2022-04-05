import { ActionTypes } from '../actionTypes';
import { SettiongGenresData2 } from './types';
// import { SettingGenresDatetypes2 } from './types';

export interface set  {
  id:number
  name:string

}

// type SGD = set[];
// const initialState: SGD = [];

// const initialState = {
//   isLoggedin: false,
//   isLoading: false,
//   items: []
// };




export const actionSettingGenresData2 = (genres:set[]): SettiongGenresData2 => {

  return {
    type: ActionTypes.setGenre,
    // payload: 
  // {
    genres:
      genres
    
   
  };
};


// export const actionSettingGenresData2 = (genres:set[]): SettingGenresDatetypes2 => {

//   return {
//     type: ActionTypes.setGenre,
//     // payload: 
//   // {
//     genres:
//       genres
    
   
//   };
// };

// export const deleteTodoAction = (genres:set[]): SettiongGenresData2 => {
//   return {
//     type: ActionTypes.setCCC,
//     genres:
//       genres
//     // payload: {
//       // genres:[{
//       //   id:genres.id,
//       //   name:genres.name
//       // }]
//     // },
//   };
// };