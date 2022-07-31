import { createContext, useReducer } from 'react';
import GithubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const ACTION = {
    GET_USERS: 'get_users',
    ACTIVATE_LOADING: 'set_loading',
    CLEAR_USERS: 'clear_users',
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //function to activate loading (cause it would be called many times)
  const setLoading = () =>
    dispatch({
      type: ACTION.ACTIVATE_LOADING,
    });

  // was used for testing purposed at the beginning
  // const fetchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(`${GITHUB_URL}/users`);
  //   const data = await response.json();
  //   dispatch({
  //     type: ACTION.GET_USERS,
  //     payload: data,
  //   });
  //   // reason why we dont have two dispatches is cause action.GET_USERS activates the two states in the reducer
  // };

  // Get search Results
  const searchUsers = async (text) => {
    const params = new URLSearchParams({
      q: text,
    });
    setLoading();
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
    const { items } = await response.json(); //we destructured from the data returned
    dispatch({
      type: ACTION.GET_USERS,
      payload: items,
    });
  };

  //Clear users from State
  const clearUsers = () => {
    dispatch({
      type: ACTION.CLEAR_USERS,
      payload: [],
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
