import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import LoginPage from './components/auth/LoginPage.tsx';
import './App.css'
import ProtectedRoute from "./components/common/ProtectedRoute.tsx";
import HRDashboard from "./components/hr/HRDashboard.tsx";
import EmployeeDashboard from "./components/employee/EmployeeDashboard.tsx";

function App() {
    return (
        <ConfigProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route
                        path="/hr-dashboard"
                        element={
                            <ProtectedRoute requiredRole="HR">
                                <HRDashboard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/employee-dashboard"
                        element={
                            <ProtectedRoute requiredRole="Employee">
                                <EmployeeDashboard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/login" replace/>}/>
                </Routes>
            </Router>
        </ConfigProvider>
    )
}

export default App
