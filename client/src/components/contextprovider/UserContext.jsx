import React, { createContext, useState } from 'react'


export const UserContext = createContext("");

const LoginUserContext = ({children}) => {

    const [loginUser, setLoginUser] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
    <UserContext.Provider value={{UserData: {loginUser, setLoginUser}, LoginStatus:{loggedIn, setLoggedIn}}}>
        {children}
    </UserContext.Provider>
    </>
  )
}

export default LoginUserContext;