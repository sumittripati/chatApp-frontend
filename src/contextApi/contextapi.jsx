import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const [islogin, setIslogin] = useState(false);
    // const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setToken(storedToken);
            setIslogin(true);
        }
    },[])

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
        setIslogin(true);
    }

    const logOut = () => {
        localStorage.clear();
        setToken(null);
        setIslogin(false);
    }

    return (
        <AppContext.Provider value={{islogin, token, login, logOut}}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
}