import axios from 'axios';

const url = 'https://berg8apidev.azurewebsites.net/workflow/GetDocuments';
const headers = {
    'Accept' : 'appliction/json',
    'Content-Type':  'multipart/form-data',
}

const dataRequest = {
    REFRESH_TOKEN: '',
    PROFILE: {
        USER_CODE: '',
        POSITION_CODE: '',
    },
    FILTER: {
        ACTIVITY_NAME: "WAITING APPROVAL",
        REQUEST_TYPE: [], //other
        DESCTIPTION: '',
        REQUESTOR: '',
        PERIOD_EXPENSE: {
            BEGIN: '2018-01-01',
            END: '9999-12-31'
        }
    },
    SELECTION: [],
    ACTION: 'INIT' //ADD, AMEND, APPROVE, REJECT, SND BACK, XLS, PDF
}

export const WaitingPageAPI = async (data = dataRequest) => {
   
       return await axios
        .post(url, data, headers)
}