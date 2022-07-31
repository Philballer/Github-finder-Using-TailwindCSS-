const GithubReducer = (state, action) => {
  switch (action.type) {
    case 'get_users': {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    }
    default:
      return state;
    //if nothing has happened initial state should be returned
  }
};

export default GithubReducer;
