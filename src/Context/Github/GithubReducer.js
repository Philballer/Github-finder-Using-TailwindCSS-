const GithubReducer = (state, action) => {
  switch (action.type) {
    case 'get_users': {
      return {
        ...state,
        users: action.payload, //makes users be replaced with whats in payload
        loading: false,
      };
    }
    case 'set_loading': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'clear_users': {
      return {
        ...state,
        users: action.payload,
        // we can also just define users as an empty array here instead of defining it with payload in context
      };
    }

    default:
      return state;
    //if nothing has happened initial state should be returned
  }
};

export default GithubReducer;
