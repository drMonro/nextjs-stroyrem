import {createContext, useContext, useEffect, useMemo, useState} from "react";

// here will be global data - current authenticated user
// const CurrentUserContext = createContext([undefined, undefined]);
// const CurrentUserContext = createContext('guest');
const CurrentUserContext = createContext('guest');

export function AppWrapper({children}) {
    const [appState, setAppState] = useState('check');

    const value = useMemo(() => ([appState, setAppState]), [appState, setAppState]);

    useEffect(() => {
        setAppState('323')
    }, []);

    let sharedState =
        '42'


    return (
        <CurrentUserContext.Provider value={sharedState}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export function useAppContext() {
    return useContext(CurrentUserContext);
}


