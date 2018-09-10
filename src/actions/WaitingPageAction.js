import * as action from "../constants/waiting-page-types";

export const OnInitDataTalbeWaitingPage = data => ({
    type: action.INIT_DATA_WAITING_PAGE,
    data: data
});

export const SetListSelectRecordWaitingPage = data => ({
    type: action.SET_SELECTED_LIST_WAITING_PAGE,
    selected: data
});

export const SetDataTableWaitingPage = data => ({
    type: action.ON_SET_DATE_TABLE_WAITING_PAGE,
    data: data
});

export const IniFilterWaitingPage = filters => ({
    type: action.INI_FILTER_WAITING_PAGE,
    payload: filters
});


export const OnFilterWaitingPage = filters => ({
    type: action.ON_FILTER_WAITING_PAGE,
    payload: filters
});

export const OnCriteriaChangeWaitingPage = filters => ({
    type: action.ON_CRITERIA_CHANGE_WAITING_PAGE,
    payload: filters
});

export const OnClickButtonWaitingPage = filters => ({
    type: action.ON_CLICK_BUTTON_WAITING_PAGE,
    payload: filters
});

export const OnAfterActionResponseWaitingPage = data => ({
    type: action.ON_ACTION_RESPONSE_WAITING_PAGE,
    clearSelected: data.clearSelected,
    data: data.data
});

// export const OnRequestCommandWaitingPage = data => ({
//     type: action.API_REQUEST_COMMAND_WAITING_PAGE,
//     actions: data
// });

export const OnRequestTaskWaitingPage = data => ({
    type: action.API_REQUEST_TASK_WAITING_PAGE,
    data
});

export const ActioButtonWaitingPageRequest = (data) => ({
    type: action.API_BUTTON_WAITING_PAGE_REQUEST,
    payload: {
        request: {
            method: 'POST',
            url: '/workflow/GetCommandActions',
            data :data
        }
    }
});
