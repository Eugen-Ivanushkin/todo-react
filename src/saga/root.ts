import { fork } from '@redux-saga/core/effects';
import { todosWatcher } from 'saga';
import flow from './socket';

export function* rootWatcher() {
  yield fork(todosWatcher);
  yield fork(flow);
}
