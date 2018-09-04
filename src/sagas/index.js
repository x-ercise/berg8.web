import { put, takeEvery } from 'redux-saga/effects'

// ...

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
//   yield delay(1000)
  yield put({ type: 'INCREMENT' })
}


export function* helloSaga() {
    console.log('Hello Sagas!')
  }