import { InitialState, Action } from 'types/user';

const initialState: InitialState = {
  isAuth: false,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
