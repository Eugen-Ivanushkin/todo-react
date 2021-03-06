import store from 'store';
import { UpdateToken } from 'const/action_types';

const errorMiddleWare =
  () => (next: any) => (action: { payload: any; type: string }) => {
    const actionType = action.type.split('_');
    actionType.pop();
    const requestType = actionType.join('_') + '_REQUEST';

    if (
      action.payload?.error &&
      action.payload.error.message === 'Invalid token!'
    ) {
      store.dispatch({
        type: UpdateToken.request,
        payload: true,
      });
      store.dispatch({
        type: requestType,
        payload: action.payload?.oldPayload,
      });
    }

    return next(action);
  };

export default errorMiddleWare;
