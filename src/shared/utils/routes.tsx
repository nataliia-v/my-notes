import React from 'react';
import { RouteProps, Route, Switch } from 'react-router-dom';

export const mapRoutes = (routes: RouteProps[]) => {
  return (
    <Switch>
      {routes.map((routeConfig, i) => {
          return <Route key={i} {...routeConfig} />;
        })}
    </Switch>
  );
};
