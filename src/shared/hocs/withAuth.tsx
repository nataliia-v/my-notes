import React, { ComponentType } from 'react';
import { Redirect } from 'react-router-dom';

export const withAuth = (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    // const token = storage.getItem('token');
    // const isAuthenticated = useSelector<Store>(
    //   state => state.session.data.isAuthenticated
    // );
    //
    // eslint-disable-next-line react/jsx-props-no-spreading
    const isAuthenticated = true;
    return isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <Redirect to="/auth/login" />
    );
  };
};
