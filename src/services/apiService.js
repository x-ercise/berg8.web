import axios from 'axios';

const url = 'https://berg8apidev.azurewebsites.net/workflow/GetDocuments';
const headers = {
    'Accept' : 'appliction/json',
    'Content-Type': 'appliction/json',
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

export const GetDataAPI = async (data = dataRequest) => {
   
       return await axios
        .post(url, data, headers)
        // .then(resolve => {
        //     console.log(resolve);
        //     if (resolve.status === 200) return resolve.data;
        //     else throw resolve;
        // })
        /* .then(response => this.setState({
            activities : response.data,
            messages   : [ ...response.message ],
            isLoading  : false,
        })) */
        // .catch(error => this.setState({
        //     messages: [{ code: null, message: error.message, }],
        //     isLoading: false
        // }));

    //  return promise;
}