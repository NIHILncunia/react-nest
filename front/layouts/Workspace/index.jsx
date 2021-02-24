import React, { useCallback } from 'react';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import useSWR from 'swr';
import { Redirect } from 'react-router';

const Workspace = ({ children, }) => {
  const { data, error, revalidate, mutate, } = useSWR('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 100000,
  });
  const onLogOut = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  if (!data) {
    return <Redirect to='/login' />;
  }

  return (
    <>
      <div>
        <button onClick={onLogOut}>로그아웃</button>
        {children}
      </div>
    </>
  );
};

export default Workspace;