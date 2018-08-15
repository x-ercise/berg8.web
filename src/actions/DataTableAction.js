import {INIT_DATA, 
    SET_SELECTED_LIST} from "../constants/data-table-action-types";
    
export const OnInitDataTalbe = data => ({
    type: INIT_DATA,
    data: data
});

export const SetListSelectRecord = data => ({
    type: SET_SELECTED_LIST,
    selected: data
});