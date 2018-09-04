import {
    ON_FILTER_WAITING_PAGE,
    ON_CRITERIA_CHANGE_WAITING_PAGE,
    ON_CLICK_BUTTON_WAITING_PAGE,
    INIT_DATA_WAITING_PAGE,
    SET_SELECTED_LIST_WAITING_PAGE,
    INI_FILTER_WAITING_PAGE,
    ON_SET_DATE_TABLE_WAITING_PAGE,
    ON_ACTION_RESPONSE_WAITING_PAGE,
    API_REQUEST_COMMAND_WAITING_PAGE,
    API_REQUEST_TASK_WAITING_PAGE
    // ON_APPROVE_RESPONSE_WAITING_PAGE,
    // ON_REJECT_RESPONSE_WAITING_PAGE,
    // ON_SEND_BACK_RESPONSE_WAITING_PAGE
} from "../constants/waiting-page-types";

export const OnInitDataTalbeWaitingPage = data => ({
    type: INIT_DATA_WAITING_PAGE,
    data: data
});

export const SetListSelectRecordWaitingPage = data => ({
    type: SET_SELECTED_LIST_WAITING_PAGE,
    selected: data
});

export const SetDataTableWaitingPage = data => ({
    type: ON_SET_DATE_TABLE_WAITING_PAGE,
    data: data
});

export const IniFilterWaitingPage = filters => ({
    type: INI_FILTER_WAITING_PAGE,
    payload: filters
});


export const OnFilterWaitingPage = filters => ({
    type: ON_FILTER_WAITING_PAGE,
    payload: filters
});

export const OnCriteriaChangeWaitingPage = filters => ({
    type: ON_CRITERIA_CHANGE_WAITING_PAGE,
    payload: filters
});

export const OnClickButtonWaitingPage = filters => ({
    type: ON_CLICK_BUTTON_WAITING_PAGE,
    payload: filters
});

export const OnAfterActionResponseWaitingPage = data => ({
    type: ON_ACTION_RESPONSE_WAITING_PAGE,
    clearSelected: data.clearSelected,
    data: data.data
});

export const OnRequestCommandWaitingPage = data => ({
    type: API_REQUEST_COMMAND_WAITING_PAGE,
    actions: data
});

export const OnRequestTaskWaitingPage = data => ({
    type: API_REQUEST_TASK_WAITING_PAGE,
    data
});


