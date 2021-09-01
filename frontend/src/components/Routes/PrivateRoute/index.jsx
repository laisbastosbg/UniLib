import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import profiles from 'utils/profiles';

const PrivateRoute = ({component: Component, restricted, ...rest}) => {
  const history = useHistory();
  
    return (
        <Route {...rest} render={props => (
            localStorage.getItem("auth") ?
                (
                    restricted && 
                    (localStorage.getItem("profile") !== profiles.admin
                ) ?
                    history.goBack()
                : <Component {...props} />)
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;
