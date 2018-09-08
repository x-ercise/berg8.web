import axios from 'axios';

const url = 'https://berg8apidev.azurewebsites.net';
const headers = {
    'Accept': 'appliction/json',
    'Content-Type': 'multipart/form-data',
}

// const dataRequest = {
//     REFRESH_TOKEN: '',
//     PROFILE: {
//         USER_CODE: '',
//         POSITION_CODE: '',
//     },
//     FILTER: {
//         ACTIVITY_NAME: "WAITING APPROVAL",
//         REQUEST_TYPE: [], //other
//         DESCTIPTION: '',
//         REQUESTOR: '',
//         PERIOD_EXPENSE: {
//             BEGIN: '2018-01-01',
//             END: '9999-12-31'
//         }
//     },
//     SELECTION: [],
//     ACTION: 'INIT' //ADD, AMEND, APPROVE, REJECT, SND BACK, XLS, PDF
// }

const dataRequest = {
    OPERATOR: {
        CODE: '',
        NAME: '',
        EMAIL: '',
        CONTACT_NO: ''
    },
    FILTER: {
        REQUEST_TYPE : [],
        CLAIM_TYPE :[],
        DESCTIPTION: '',
        REQUESTOR: '',
        PREVIOUS: '',
        PERIOD_BEGIN: '2018-01-01',
        PERIOD_END: '9999-12-31'

    }
}


export const GetDocumentListAPI = async (data = dataRequest) => {

    return await axios
        .post(url + '/workflow/GetDocuments', data, headers)
}

export const GetCommandActionAPI = async (params) => {
    return await axios.post(url + '/workflow/GetCommandActions', {
        OPERATOR : {
            CODE : 'NONE',
            NAME : 'NONE',
            EMAIL: 'NONE',
            CONTACT_NO : 'NONE'
        }
    }, headers)
}

export const GetTaskAPI = async (params) => {
    return await axios.post(url + '/workflow/GetTasks', {
        OPERATOR : {
            CODE : 'NONE',
            NAME : 'NONE',
            EMAIL: 'NONE',
            CONTACT_NO : 'NONE'
        },
        WIDGET : 'TASK'
    }, headers)
}