// src/Binyan.js
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Binyan = ({ auth }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState('');

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
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('https://us-central1-va-ad-bayit.cloudfunctions.net/api/binyan', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Binyan</h2>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Binyan;
