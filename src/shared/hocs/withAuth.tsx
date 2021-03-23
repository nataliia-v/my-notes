import React, { ComponentType } from 'react';

export const withAuth = (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    const isAuthenticated = true;
    return isAuthenticated && <WrappedComponent {...props} />;
  };
};
