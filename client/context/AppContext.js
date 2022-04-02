import {createContext, useContext, useEffect, useMemo, useState} from "react";

const AppContext = createContext([undefined, undefined]);

export function AppWrapper({children}) {
    const [appState, setAppState] = useState();

    const value = useMemo(() => ([appState, setAppState]), [appState, setAppState]);
    // console.log('provider')
    // console.log(data)
    useEffect(() => {

        setAppState({datadd: '323'})
    }, [])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}


