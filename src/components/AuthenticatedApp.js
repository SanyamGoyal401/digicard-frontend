import {
    Route,
    Routes
} from 'react-router-dom';

import {AuthProvider} from '../context/authContext';
import AdminForm from '../pages/AdminForm';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import PrivateRoute from './privateRoute';

const AuthenticatedApp = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route element={<PrivateRoute />}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/form' element={<AdminForm />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default AuthenticatedApp;
