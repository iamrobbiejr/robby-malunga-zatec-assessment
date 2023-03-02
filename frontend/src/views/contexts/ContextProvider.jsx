import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {
    },
    setUserToken: () => {
    }
})

export const ContextProvider = ({children}) => {

    const [currentUser, _setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || {})
    const [userToken, _setUserToken] = useState(localStorage.getItem('userToken') || '')

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('userToken', token)
        } else {
            localStorage.removeItem('userToken')
        }

        _setUserToken(token);
    }

    const setCurrentUser = (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }

        _setCurrentUser(user);
    }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
