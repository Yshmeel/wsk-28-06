import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppContext from '../../contexts/app.context'
import HomeScreen from '../../screens/home'
import LoginScreen  from '../../screens/login'
import NewMachineScreen  from '../../screens/new-machine'

const Router = () => {
    const context = useContext(AppContext);

    return (
        <Routes>
            <Route path='/' element={context.authorized ? <HomeScreen /> : <LoginScreen />} />
            {context.authorized && (
                <Route path='/new-machine' element={<NewMachineScreen />} />
            )}
        </Routes>
    )
};

export default Router;
