import * as ActType from "../constants/waiting-page-types";
import { Modal } from 'antd';

const defaultState = {
    data: [],
    selected: [],
    filter: {
        Status: "WAITING APPROVAL",
        RequestType: [],
        ClaimType: [],
        Description: '',
        Requestor: '',
        ExpensePeriod: {
            Begin: null,
            End: null
        },
        Action: ''
    },
    actions: [],
    myTasks: [],
};

const networkError = () => {
    Modal.error({
        title: "Error",
        content: 'Error occur while sending reqeust!!'
    })
}

const waitingListPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActType.SET_SELECTED_LIST_WAITING_PAGE:
            return { ...state, ...{ selected: action.selected } };
        case ActType.ON_FILTER_WAITING_PAGE:
            return { ...state, ...{ filter: { ...action.payload }, selected: [] } };
        case ActType.ON_CRITERIA_CHANGE_WAITING_PAGE:
            return { ...state, filter: { ...action.payload } };
        case ActType.ON_CLICK_BUTTON_WAITING_PAGE:
            return { ...state, filter: { ...action.payload } };
        case ActType.ON_ACTION_RESPONSE_WAITING_PAGE:
            if (action.clearSelected) {
                return { ...state, ...{ data: action.data, selected: [] } };
            }
            return state;
        case ActType.API_BUTTON_WAITING_PAGE_SUCCESS:
            return { ...state, actions: action.payload.data.ACTIONS };
        case ActType.API_BUTTON_WAITING_PAGE_FAIL:
            networkError()
            return { ...state };
        case ActType.API_TASK_WAITING_PAGE_SUCCESS:
            return { ...state, myTasks: action.payload.data.TASKS };
        case ActType.API_TASK_WAITING_PAGE_FAIL:
            networkError()
            return { ...state };
        case ActType.API_DOCUMENTS_WAITTING_PAGE_SUCCESS:
            return { ...state, ...{ data: action.payload.data.DOCUMENTS, selected: [] } };
        case ActType.API_DOCUMENTS_WAITTING_PAGE_FAIL:
            networkError()
            return { ...state };

        default:
            return state;
    }
};

export default waitingListPageReducer;