import { createContext, useReducer } from 'react';
import GithubReducer from './GithubReducer';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const ACTION = {
    GET_USERS: 'get_users',
    GET_SING_USER: 'get_sing_users',
    ACTIVATE_LOADING: 'set_loading',
    CLEAR_USERS: 'clear_users',
    GET_REPOS: 'get_repos',
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
  // Get Repos
  const getUserRepos = async (login) => {
    //to sort repos to how they are created and first 10 per page
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });
    setLoading();
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`
    );
    const data = await response.json(); //we destructured from the data returned
    dispatch({
      type: ACTION.GET_REPOS,
      payload: data,
    });
  };

  // Get single user
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}`);
    if (response.status === 404) {
      window.location = '/notfound'; //doesnt matter what i put here, notfound helps clients to see
      //if there is an error in URL
    } else {
      const data = await response.json();
      dispatch({
        type: ACTION.GET_SING_USER,
        payload: data,
      });
    }
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
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
