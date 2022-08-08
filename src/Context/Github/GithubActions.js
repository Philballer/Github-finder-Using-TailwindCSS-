import axios from 'axios';
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
  baseURL: GITHUB_URL,
});

// Get search Results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  if (response.data.total_count === 0) {
    return null;
  } else {
    return response.data.items;
  }
};

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};

// was used for testing purposed at the beginning
// const fetchUsers = async () => {
//   const response = await fetch(`${GITHUB_URL}/users`);
//   const data = await response.json();
//   dispatch({
//     type: ACTION.GET_USERS,
//     payload: data,
//   });
//   // reason why we dont have two dispatches is cause action.GET_USERS activates the two states in the reducer
// };

// //Clear users from State ( No longer used cause we can dispatch directly)
//   const clearUsers = () => {
//     dispatch({
//       type: ACTION.CLEAR_USERS,
//       payload: [],
//     });
//   };
