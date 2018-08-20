import {
    ON_FILTER_WAITING_PAGE,
    ON_CRITERIA_CHANGE_WAITING_PAGE,
    INIT_DATA_WAITING_PAGE,
    SET_SELECTED_LIST_WAITING_PAGE,
    INI_FILTER_WAITING_PAGE,
    ON_SET_DATE_TABLE_WAITING_PAGE,
    ON_APPROVE_RESPONSE_WAITING_PAGE,
    ON_REJECT_RESPONSE_WAITING_PAGE,
    ON_SEND_BACK_RESPONSE_WAITING_PAGE
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

const TransfromData = (data) => {
    let newList = data.map((e) => ({ key: e.documentNo, ...e }));
    return newList;
};

const waitingListPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INI_FILTER_WAITING_PAGE: {
            return { ...state, filter: { ...action.payload } };
        }
        case INIT_DATA_WAITING_PAGE:
            return { ...state, data: TransfromData(action.data) };
        case SET_SELECTED_LIST_WAITING_PAGE:

            return Object.assign({}, state, {
                selected: action.selected
            });
        case ON_FILTER_WAITING_PAGE:
            return { ...state, ...{filter: { ...action.payload }, selected:[]} };
        case ON_CRITERIA_CHANGE_WAITING_PAGE:
            return { ...state, filter: { ...action.payload } };
        case ON_SET_DATE_TABLE_WAITING_PAGE:
            return { ...state, data: TransfromData(action.data) };
        case ON_APPROVE_RESPONSE_WAITING_PAGE:
            if (action.clearSelected) {
                return { ...state, ...{ data: TransfromData(action.data), selected: [] } };
            }
            return state;
        case ON_REJECT_RESPONSE_WAITING_PAGE:
            if (action.clearSelected) {
                return { ...state, ...{ data: TransfromData(action.data), selected: [] } };
            }
            return state;
        case ON_SEND_BACK_RESPONSE_WAITING_PAGE:
            if (action.clearSelected) {
                return { ...state, ...{ data: TransfromData(action.data), selected: [] } };
            }
            return state;
        default:
            return state;
    }
};

export default waitingListPageReducer;