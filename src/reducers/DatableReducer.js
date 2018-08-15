import { INIT_DATA, SET_SELECTED_LIST } from "../constants/data-table-action-types";

const defaultState = {
  data: [],
  selected: []
};

const dataTableReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INIT_DATA:
      return [...state, ...action.data];
    case SET_SELECTED_LIST:

      return Object.assign({}, state, {
        selected: action.selected
      });
    default:
      return state;
  }
};
export default dataTableReducer;