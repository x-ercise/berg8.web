import * as action from "../constants/waiting-page-types";

export const SetListSelectRecordWaitingPage = data => ({
    type: action.SET_SELECTED_LIST_WAITING_PAGE,
    selected: data
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

// export const OnAfterActionResponseWaitingPage = data => ({
//     type: action.ON_ACTION_RESPONSE_WAITING_PAGE,
//     clearSelected: data.clearSelected,
//     data: data.data
// });

export const GetTaskWaitingPage = data => ({
    type: action.API_TASK_WAITING_PAGE_REQUEST,
    payload: {
        request: {
            method: 'POST',
            url: '/workflow/GetTasks',
            headers : {'content-type' : 'application/json'},
            data: JSON.stringify(data)
        }
    }
});

export const GetActionButtonWaitingPage = (data) => ({
    type: action.API_BUTTON_WAITING_PAGE_REQUEST,
    payload: {
        request: {
            method: 'POST',
            url: '/workflow/GetCommandActions',
            headers : {'content-type' : 'application/json'},
            data: JSON.stringify(data)
        }
    }
});

export const GetDocumentWaitingPage = (data) => ({
    type: action.API_DOCUMENTS_WAITTING_PAGE_REQUEST,
    payload: {
        request: {
            method: 'POST',
            url: '/workflow/GetDocuments',
            headers : {'content-type' : 'application/json'},
            data: JSON.stringify(data)
        }
    }
});
