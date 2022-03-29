import { SearchProductsData } from 'store/search/types';
import { ActionTypes } from '../actionTypes';
import { StudiosData, StudiosDataTypes } from './types';
// import {CastsData, CastsDataTypes} from './types';

const initialState:StudiosData = {
  studiosids:{
  studios_id_in:[""],
  },
  studio:[]
}


export const SettingStudiosReducer = (state=initialState, action:StudiosDataTypes):StudiosData => {
  switch (action.type) {
    case ActionTypes.Studios:
      state.studiosids.studios_id_in.push(
        action.payload.id
      );
      state.studio.push(
        action.payload.studio
      );
      return {
        studiosids:{studios_id_in:state.studiosids.studios_id_in},
        studio:state.studio
      };
    case ActionTypes.DeleteStudios:
      return {
        studiosids:{studios_id_in:state.studiosids.studios_id_in.filter(data => data !== action.payload.id)},
        studio:state.studio.filter(data=>data != action.payload.studio)
      }
    case ActionTypes.DeleteStudiosOne:
      // console.log(state.janls_id_in.filter(data => data !== action.payload.id))
      // state.janls_id_in.filter(data => data !== action.payload.id);
      return {
        studiosids:{studios_id_in:state.studiosids.studios_id_in.filter(data => data !== action.payload.id)},
        studio:state.studio.filter(data=>data != action.payload.studio)
      }

    case ActionTypes.DeleteStudiosAll:
      // console.log(state.janls_id_in.filter(data => data !== action.payload.id))
      // state.janls_id_in.filter(data => data !== action.payload.id);
      return {
        // janls_id_in:[""]
        studiosids:{ studios_id_in:[""]},
        studio:[]

      }

    case ActionTypes.DeleteStudiosExceptOne:
      state.studiosids.studios_id_in=[""]
      state.studiosids.studios_id_in.push(
        // {
        action.payload.id
        // id: action.payload.id,
        // title: action.payload.title,
      // }
      );
      state.studio=[]
      state.studio.push(
        action.payload.studio
      )
    return {
      // janls_id_in:[""]
      studiosids:{studios_id_in:state.studiosids.studios_id_in},
      studio:state.studio
    }
    // default:
    //   return state;
    default:
      const _ : never = action
      return state;
  }
};
