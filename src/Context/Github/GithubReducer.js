const GithubReducer = (state, action) => {
  switch (action.type) {
    case 'get_users': {
      return {
        ...state,
        users: action.payload, //makes users be replaced with whats in payload
        loading: false,
      };
    }
    case 'get_user_and_repos': {
      return {
        ...state,
        user: action.payload.user, //.user and . repo is gotten from the obj in action
        repos: action.payload.repos,
        loading: false,
      };
    }
    case 'set_loading': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'stop_loading': {
      return {
        ...state,
        loading: false,
      };
    }
    case 'set_user_notfound': {
      return {
        ...state,
        userFound: false,
      };
    }
    case 'set_user_found': {
      return {
        ...state,
        userFound: true,
      };
    }

    case 'clear_users': {
      return {
        ...state,
        users: [],
        // we just defined users as an empty array here instead of defining it with payload in context
      };
    }

    default:
      return state;
    //if nothing has happened initial state should be returned
  }
};

export default GithubReducer;
