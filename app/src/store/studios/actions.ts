
import { ActionTypes } from '../actionTypes';
import { StudiosDataTypes} from './types';

type Studios = {
  id:number
  company:string
}

export const pussingtodoStudiosDataAction = (id:string,studios:Studios):StudiosDataTypes => {
  return {
    type: ActionTypes.Studios,
    payload: {
      id:id,
      studio:studios
    },
  };
};

export const deletingtodoStudiosDataAction = (id:string,studios:Studios):StudiosDataTypes => {
  return {
    type: ActionTypes.DeleteStudios,
    payload: {
      id:id,
      studio:studios
    },
  };
};

export const deletingtodoStudiosDataOneAction = (id:string,studios:Studios):StudiosDataTypes => {
  return {
    type: ActionTypes.DeleteStudiosOne,
    payload: {
      id:id,
      studio:studios
    },
  };
};

export const deletingtodoStudiosDataALLAction = ():StudiosDataTypes => {
  return {
    type: ActionTypes.DeleteStudiosAll,
    payload: {

    },
  };
};

export const deletingtodoStudiosDataExceptOneAction = (id:string,studios:Studios):StudiosDataTypes => {
  return {
    type: ActionTypes.DeleteStudiosExceptOne,
    payload: {
      id:id,
      studio:studios
    },
  };
};