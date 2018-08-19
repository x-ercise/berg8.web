import {
    ON_FILTER_WAITING_PAGE,
    ON_CRITERIA_CHANGE_WAITING_PAGE,
    INIT_DATA_WAITING_PAGE,
    SET_SELECTED_LIST_WAITING_PAGE,
    INI_FILTER_WAITING_PAGE,
    ON_SET_DATE_TABLE_WAITING_PAGE
} from "../constants/waiting-page-types";

const defaultState = {
    data: [],
    selected: [],
    filter: {
        Status: "WAITING APPROVAL",
        RequestType: [],
        Description: '',
        Requestor: '',
        FromDate: '',
        ExpensePeriod: {
            Begin: '',
            End: ''
        },
    }
};

const waitingListPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INI_FILTER_WAITING_PAGE: {
            return { ...state, filter: { ...action.payload } };
        }
        case INIT_DATA_WAITING_PAGE:
            return [...state, ...action.data];
        case SET_SELECTED_LIST_WAITING_PAGE:

            return Object.assign({}, state, {
                selected: action.selected
            });
        case ON_FILTER_WAITING_PAGE:
            return { ...state, filter: { ...action.payload } };
        case ON_CRITERIA_CHANGE_WAITING_PAGE:
            return { ...state, filter: { ...action.payload } };
        case ON_SET_DATE_TABLE_WAITING_PAGE:
        
            return { ...state, data: action.data };
        default:
            return state;
    }
};

export default waitingListPageReducer;