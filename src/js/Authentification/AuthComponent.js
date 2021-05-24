import AuthContext from './AuthContext';
import React, { useContext } from 'react';

/**
 * Component to show content if the user is logged in or not
 * @param {login, children}
 * login --> Condidition to show content
 * children --> content
 */
export default function AuthComponent({login, children}) {
    const loginContext = useContext(AuthContext);
    return (
        <>
            {loginContext.isLogin === JSON.parse(login) && children}
        </>
	);
}
