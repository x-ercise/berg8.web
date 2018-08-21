import moment from 'moment';

const tempDataWaitingForm = {
    REFRESH_TOKEN: '',
    PROFILE: {
        USER_CODE: '',
        POSITION_CODE: '',
    },
    FILTER: {
        ACTIVITY_NAME: "WAITING APPROVAL",
        REQUEST_TYPE: 'Travel', //other
        DESCTIPTION: '',
        REQUESTOR: '',
        PERIOD_EXPENSE: {
            BEGIN: '2018-01-01',
            END: '9999-12-31'
        }
    },
    SELECTION: [],
    ACTION: 'INIT' //ADD, AMEND, APPROVE, REJECT, SND BACK, XLS, PDF
};

export const mapDataFilterWaitingPage = (filter) => {
    let data = { ...tempDataWaitingForm };
    data.FILTER = {
      ACTIVITY_NAME: "WAITING APPROVAL",
    //  REQUEST_TYPE: "Travel", //other
      REQUEST_TYPE: filter.RequestType, //other
      DESCTIPTION:filter.Description,
      REQUESTOR: filter.Requestor,
      PERIOD_EXPENSE: {
        BEGIN:filter.ExpensePeriod.Begin? moment(filter.ExpensePeriod.Begin,'DD/MM/YYYY').format('YYYY-MM-DD') :'2018-01-01',
        END:filter.ExpensePeriod.End? moment(filter.ExpensePeriod.End,'DD/MM/YYYY').format('YYYY-MM-DD') :'9999-12-31'
      }
    }

    data.ACTION = filter.Action;

    return data;
}