import React, {useCallback, useEffect, useState} from 'react'
import ErrorModal from './containers/error-modal'
import Router from './features/router';
import AppContext from './contexts/app.context';
import {deleteUserToken, getUserToken, setUserToken} from './features/user';
import http from './services/http'
import Header from "./containers/header"

const App = () => {
    const [authorized, setAuthorized] = useState(false);
    const [openedErrorModal, setOpenedErrorModal] = useState(false);
    const [errorModalTitle, setErrorModalTitle] = useState('');
    const [errorModalText, setErrorModalText] = useState('');

    useEffect(() => {
        const token = getUserToken();

        if(token !== '') {
            http.setAuthorization(token);
            setAuthorized(true);
        }
    }, []);

    const login = useCallback((token) => {
        setUserToken(token);
        http.setAuthorization(token);
        setAuthorized(true);
    }, [setAuthorized]);

    const logout = useCallback(() => {
        deleteUserToken();
        http.setAuthorization('');
        setAuthorized(false);
    }, [setAuthorized]);

    const showErrorModal = useCallback((title, text) => {
        setErrorModalTitle(title);
        setErrorModalText(text);
        setOpenedErrorModal(true);
    }, [setErrorModalTitle, setErrorModalText, setOpenedErrorModal]);

    const onCloseErrorModal = useCallback(() => {
        setOpenedErrorModal(false);
    }, [openedErrorModal]);

    const contextValue = {
        showErrorModal,
        authorized,
        login,
        logout
    };

    return (
        <AppContext.Provider value={contextValue}>
            <ErrorModal isOpen={openedErrorModal}
                        title={errorModalTitle}
                        text={errorModalText}
                        onClose={onCloseErrorModal} />

            <Header />
            <Router />
        </AppContext.Provider>
    )
};

export default App;
