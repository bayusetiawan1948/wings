import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    nameUser: null,
    token: null,
    setUser: () => {},
    handlingSetToken: () => {},
});

const ContextProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("token"));

    const handlingSetToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                handlingSetToken,
                setUser,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

const useStateContext = () => useContext(StateContext);

export { useStateContext, ContextProvider };
