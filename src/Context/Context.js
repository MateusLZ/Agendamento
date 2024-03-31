import { createContext } from "react";

const UserContext = createContext({
    token: null,
    setToken: () => {},
    userIsAdmin: false,
    userName: "", 
});

export default UserContext;
