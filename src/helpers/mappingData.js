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
            REQUEST_TYPES : filter.RequestType,
            CLAIM_TYPES : filter.ClaimType,
            DESCRIPTION: filter.Description,
            REQUESTOR: filter.Requestor,
            PREVIOUS:'',
            PERIOD_BEGIN: filter.ExpensePeriod.Begin ? (filter.ExpensePeriod.Begin).format('YYYY-MM-DD') : '2018-01-01',
            PERIOD_END: filter.ExpensePeriod.End ? (filter.ExpensePeriod.End).format('YYYY-MM-DD') : '9999-12-31'

        }
    }
    return data;
}