import { useParams } from 'react-router-dom';

function Dashboard() {
  const { email } = useParams();

  return (
    <div>
      <h1>Welcome</h1>
      <p>{email}</p>
    </div>
  );
}

export default Dashboard;