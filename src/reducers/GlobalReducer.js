import { IS_LOADING } from "./../constants/action-types";

const globalFlag = {
  isLoading : false
};


const globalReducer = (state = globalFlag, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {...state,isLoading : action.isLoading}
    default:
      return state;
  }
};

export default globalReducer;