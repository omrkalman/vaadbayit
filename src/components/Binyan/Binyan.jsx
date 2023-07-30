// src/ProtectedData.js
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useIdToken } from 'react-firebase-hooks/auth';

const ProtectedData = ({ auth }) => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState('');
  const [idToken, loading, error] = useIdToken(user);

  useEffect(() => {
    if (idToken) {
      fetchData();
    }
  }, [idToken]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/binyan', {
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Protected Data</h2>
      <p>{data}</p>
    </div>
  );
};

export default ProtectedData;
