import React from 'react'

  
// Creating the context object and passing the default values.
const UserContext = React.createContext({
    isLoggedIn: false,
    user: '',
    setUser: () => {},
    setIsLoggedIn: () => {}
});
  
export default UserContext
