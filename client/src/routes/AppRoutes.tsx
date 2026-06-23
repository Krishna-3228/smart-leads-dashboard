import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import LeadsPage from "../pages/LeadsPage";
import UsersPage from "../pages/UsersPage";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate to="/dashboard" />
                    }
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/leads"
                        element={<LeadsPage />}
                    />

                    <Route
                        path="/users"
                        element={<UsersPage />}
                    />
                </Route>

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;