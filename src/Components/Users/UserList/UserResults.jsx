import { useContext } from 'react';
import Spinner from '../../Layout/Spinner/Spinner';
import SingleUser from '../SingleUser/SingleUser';
import GithubContext from '../../../Context/Github/GithubContext';

function UserResults() {
  const { users, loading } = useContext(GithubContext);

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <SingleUser key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
