import AuthContext from './AuthContext';
import React, { useContext } from 'react';

export default function AuthComponent(props) {
    const loginContext = useContext(AuthContext);
    return (
        <>
            {loginContext.isLogin === JSON.parse(props.login) && props.children}
        </>
	);
}
