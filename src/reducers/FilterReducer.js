import {ON_FILTER, ON_CRITERIA_CHANGE} from "../constants/filter-action-types";

const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case ON_FILTER:
      return {...state, ...action.payload};
    case ON_CRITERIA_CHANGE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default filterReducer;