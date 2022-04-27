import { SearchProductsData } from '@/store/search/types';
import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import { todoKisetsuDataTypes, todoKisetsuData} from './types';

// import {arrayGenres} from './types';

type Kisetsu = {
  id:number
  name:string
}


const initialState:todoKisetsuData={
  kisetsusids:{
    // kisetsus_id_eq: ""
    year_season_seasons_id_eq:""
  },
  kisetsu:{
    id:0,
    name:""
  }
}

export const settiongtodoKisetsuReducer = (state=initialState, action:todoKisetsuDataTypes):todoKisetsuData => {
  switch (action.type) {
    case ActionTypes.todoKisetsu:
      state.kisetsusids.year_season_seasons_id_eq = action.payload.id
      return {
        kisetsusids:{year_season_seasons_id_eq:action.payload.id},
        kisetsu:action.payload.kisetsu
      };
    case ActionTypes.deletetodoKisetsuAll:

    return {
      kisetsusids:{year_season_seasons_id_eq:""},
      kisetsu:{id:0,name:""}
    };
   
    default:
      const _ : never = action
      return state;
  }
};

