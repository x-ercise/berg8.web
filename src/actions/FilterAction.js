import {ON_FILTER, 
    ON_CRITERIA_CHANGE,
    ON_CLICK_BUTTON
} from "../constants/filter-action-types";

export const OnFilter = filters => ({
    type: ON_FILTER,
    payload: filters
});

export const OnCriteriaChange = filters => ({
    type: ON_CRITERIA_CHANGE,
    payload: filters
});

export const OnClickButton = filters => ({
    type: ON_CLICK_BUTTON,
    payload: filters
});

