import moment from 'moment';

export const mapDataFilterWaitingPage = (filter) => {
    // let data = { ...tempDataWaitingForm };
    let data = {
        OPERATOR: {
            CODE: '',
            NAME: 'Ton',
            EMAIL: '',
            CONTACT_NO: ''
        },
        FILTER: {
            REQUEST_TYPE : filter.RequestType,
            CLAIM_TYPE : filter.ClaimType,
            DESCTIPTION: filter.Description,
            REQUESTOR: filter.Requestor,
            PREVIOUS:'',
            PERIOD_BEGIN: filter.ExpensePeriod.Begin ? moment(filter.ExpensePeriod.Begin, 'DD/MM/YYYY').format('YYYY-MM-DD') : '2018-01-01',
            PERIOD_END: filter.ExpensePeriod.End ? moment(filter.ExpensePeriod.End, 'DD/MM/YYYY').format('YYYY-MM-DD') : '9999-12-31'

        }
    }
    return data;
}