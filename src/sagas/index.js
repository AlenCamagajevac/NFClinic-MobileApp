import { all } from 'redux-saga/effects';

import { nfcSaga } from './NfcSaga';

export default function* rootSaga() {
  yield all([
    nfcSaga,
  ]);
}
