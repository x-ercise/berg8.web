import axios from 'axios';

const url = 'https://berg8apidev.azurewebsites.net';
const headers = {
    'Accept': 'appliction/json',
    'Content-Type': 'multipart/form-data',
}

const dataRequest = {
    REFRESH_TOKEN : '',
    OPERATOR: {
        CODE: 'REQUESTOR',
        NAME: '',
        EMAIL: '',
        CONTACT_NO: ''
    },
    FILTER: {
        REQUEST_TYPES : [],
        CLAIM_TYPES :[],
        DESCRIPTION: '',
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
            CODE : 'REQUESTOR',
            NAME : 'NONE',
            EMAIL: 'NONE',
            CONTACT_NO : 'NONE'
        }
    }, headers)
}

export const GetTaskAPI = async (params) => {
    return await axios.post(url + '/workflow/GetTasks', {
        OPERATOR : {
            CODE : 'REQUESTOR',//'REQUESTOR' , 'APPROVER'
            NAME : 'NONE',
            EMAIL: 'NONE',
            CONTACT_NO : 'NONE'
        },
        WIDGET : 'TASK'
    }, headers)
}