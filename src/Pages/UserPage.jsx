/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GithubContext from '../Context/Github/GithubContext';

function UserPage() {
  const { user, getUser } = useContext(GithubContext);

  const params = useParams();
  // this is used to match params in the api, with the help of useParams hook

  useEffect(() => {
    getUser(params.login);
  }, []);

  return <div>{user.login}</div>;
}

export default UserPage;
