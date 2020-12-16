import React, { ComponentType } from 'react';
import { useRecoilState } from 'recoil';

import { userInfo } from "../../App";

export const withAuth = (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    const [user] = useRecoilState<any>(userInfo);
    const isAuthenticated = user.isAuth;
    return isAuthenticated && (
      <WrappedComponent {...props} />
    ) ;
  };
};
