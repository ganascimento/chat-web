import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from './../services/auth';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/chat", state: { from: props.location } }} />
            )
        }
    />
);


export default PrivateRoute;