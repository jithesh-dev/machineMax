import { AnyAction, Reducer } from 'redux';

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}
export interface IUserState {
  user: IUser | null;
}

export const initialState: IUserState = {
  user: null,
};

const actionTypes = {
  LOGIN_USER: 'LOGIN_USER',
  REMOVE_USER: 'REMOVE_USER',
};

export const loginUser = (payload: IUser) => ({
  type: actionTypes.LOGIN_USER,
  payload,
});
export const removeUser = () => ({
  type: actionTypes.LOGIN_USER,
});

const reducer: Reducer<IUserState> = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.REMOVE_USER:
      return initialState;
  }
  return state;
};

export { reducer as default };
