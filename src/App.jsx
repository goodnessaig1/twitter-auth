import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Authorization from './components/Auth/Authorization';
import Login from './components/Auth/Login';
import { useAuth } from './components/Context/AuthContext';
import UserDashboard from './components/Dashboard/UserDashboard';
function App() {
  const { requestToken } = useAuth();
  return (
    <>
      <Routes>
        <Route
          path='/'
          exact
          element={
            !requestToken ? <Navigate to='/sign-in' replace /> : <Dashboard />
          }
          // Component={Dashboard}
        />
        <Route path='/sign-in' exact Component={Login} />
        <Route
          path='/user-dashboard/:screen_name/:user_id'
          exact
          Component={UserDashboard}
        />

        <Route
          path='/authorization/verify-otp'
          exact
          element={
            !requestToken ? (
              <Navigate to='/sign-in' replace />
            ) : (
              <Authorization />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
