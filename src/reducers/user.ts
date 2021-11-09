import { InitialState, Action } from 'types/user';
import { UserSignIn } from 'const/action_types';

import saveToken from '../utils/saveTouken';

const initialState: InitialState = {
  isAuth: false,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case UserSignIn.success: {
      //@ts-ignore
      saveToken(action.payload.tokens);
      return { ...state, isAuth: true };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
