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

// Get Repos
export const getUserRepos = async (login) => {
  //to sort repos to how they are created and first 10 per page
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
  const data = await response.json(); //we destructured from the data returned
  return data;
};

// Get single user
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`);
  if (response.status === 404) {
    window.location = '/notfound'; //doesnt matter what i put here, notfound helps clients to see
    //if there is an error in URL
  } else {
    const data = await response.json();
    return data;
  }
};

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

// //Clear users from State ( No longer used cause we can dispatch directly)
//   const clearUsers = () => {
//     dispatch({
//       type: ACTION.CLEAR_USERS,
//       payload: [],
//     });
//   };
