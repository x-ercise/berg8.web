import {
    IS_LOADING,
    
} from "../constants/action-types";

export const SetFlagLoading = flag => ({
    type: IS_LOADING,
    isLoading: flag
});