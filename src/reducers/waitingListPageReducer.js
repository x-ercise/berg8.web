import {
    ON_FILTER_WAITING_PAGE,
    ON_CRITERIA_CHANGE_WAITING_PAGE,
    INIT_DATA_WAITING_PAGE,
    SET_SELECTED_LIST_WAITING_PAGE,
    INI_FILTER_WAITING_PAGE,
    ON_SET_DATE_TABLE_WAITING_PAGE,
    ON_CLICK_BUTTON_WAITING_PAGE,
    ON_ACTION_RESPONSE_WAITING_PAGE,
    API_REQUEST_COMMAND_WAITING_PAGE,
    API_REQUEST_TASK_WAITING_PAGE
} from "../constants/waiting-page-types";

const defaultState = {
    data: [],
    selected: [],
    filter: {
        Status: "WAITING APPROVAL",
        RequestType: [],
        ClaimType:[],
        Description: '',
        Requestor: '',
        ExpensePeriod: {
            Begin: null,
            End: null
        },
        Action: ''
    },
    actions: [],
    myTasks : [],
};

const waitingListPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INI_FILTER_WAITING_PAGE: {
            return { ...state, filter: { ...action.payload } };
        }
        case INIT_DATA_WAITING_PAGE:
            return { ...state, data: action.data };
        case SET_SELECTED_LIST_WAITING_PAGE:
            return {...state, ...{ selected: action.selected}};
        case ON_FILTER_WAITING_PAGE:
            return { ...state, ...{ filter: { ...action.payload }, selected: [] } };
        case ON_CRITERIA_CHANGE_WAITING_PAGE:
            return { ...state, filter: { ...action.payload } };
        case ON_SET_DATE_TABLE_WAITING_PAGE:
            return { ...state, data: action.data };
        case ON_CLICK_BUTTON_WAITING_PAGE:
            return { ...state, filter: { ...action.payload } };
        case ON_ACTION_RESPONSE_WAITING_PAGE:
            if (action.clearSelected) {
                return { ...state, ...{ data: action.data, selected: [] } };
            }
            return state;
        case API_REQUEST_COMMAND_WAITING_PAGE:
            return {...state, actions : action.actions};
        case API_REQUEST_TASK_WAITING_PAGE :
            return {...state,myTasks : action.data};
        default:
            return state;
    }
};

export default waitingListPageReducer;