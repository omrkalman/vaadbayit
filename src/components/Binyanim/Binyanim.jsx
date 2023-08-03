import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Binyan from '../Binyan/Binyan';

const Binyanim = ({ auth }) => {
  const [user, setUser] = useState(null);
  const [binyanim, setBinyanim] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user) {
      // Fetch the protected data when the user is available
      fetchBinyanim();
    }
  }, [user]);

  const fetchBinyanim = async () => {
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('https://us-central1-va-ad-bayit.cloudfunctions.net/api/binyan', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setBinyanim(data.binyanim);
    } catch (error) {
      console.error('Error fetching binyanim:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Binyanim</h2>
      {binyanim.map(b => <Binyan key={Math.trunc(Math.random()*10e6)} binyan={b} />)}
    </div>
  );
};

export default Binyanim;
