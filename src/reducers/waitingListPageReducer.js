import * as ActType from "../constants/waiting-page-types";

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
        case ActType.INI_FILTER_WAITING_PAGE: {
            return { ...state, filter: { ...action.payload } };
        }
        case ActType.INIT_DATA_WAITING_PAGE:
            return { ...state, data: action.data };
        case ActType.SET_SELECTED_LIST_WAITING_PAGE:
            return {...state, ...{ selected: action.selected}};
        case ActType.ON_FILTER_WAITING_PAGE:
            return { ...state, ...{ filter: { ...action.payload }, selected: [] } };
        case ActType.ON_CRITERIA_CHANGE_WAITING_PAGE:
            return { ...state, filter: { ...action.payload } };
        case ActType.ON_SET_DATE_TABLE_WAITING_PAGE:
            return { ...state, data: action.data };
        case ActType.ON_CLICK_BUTTON_WAITING_PAGE:
            return { ...state, filter: { ...action.payload } };
        case ActType.ON_ACTION_RESPONSE_WAITING_PAGE:
            if (action.clearSelected) {
                return { ...state, ...{ data: action.data, selected: [] } };
            }
            return state;
        case ActType.API_REQUEST_COMMAND_WAITING_PAGE:
            return {...state, actions : action.actions};
        case ActType.API_BUTTON_WAITING_PAGE_SUCCESS :
        console.log()
            return {...state, actions : action.payload.data.ACTIONS};
        case ActType.API_REQUEST_TASK_WAITING_PAGE :
            return {...state,myTasks : action.data};
        default:
            return state;
    }
};

export default waitingListPageReducer;