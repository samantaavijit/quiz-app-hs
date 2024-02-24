import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./common/layout/AdminLayout";
import UserLayout from "./common/layout/UserLayout";
import Register from "./pages/auth/Register";

function ProtectRoute() {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
}

const AdminProtectRoute = () => {
  return localStorage.getItem("admin_token") ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" />
  );
};

export default function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UserLayout>
                <Login />
              </UserLayout>
            }
          />
          <Route
            path="/registration"
            element={
              <UserLayout>
                <Register />
              </UserLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <UserLayout>
                <Dashboard />
              </UserLayout>
            }
          />

          {/* ONLY FOR ADMIN  */}

          <Route
            path="/admin/*"
            element={
              <Routes>
                <Route index element={<AdminLogin />} />
                <Route element={<AdminProtectRoute />}>
                  <Route
                    path="/dashboard"
                    element={
                      <AdminLayout>
                        <AdminDashboard />
                      </AdminLayout>
                    }
                  />
                  <Route
                    path="/home"
                    element={
                      <AdminLayout>
                        <Dashboard />
                      </AdminLayout>
                    }
                  />
                  <Route
                    path="/about-us"
                    element={
                      <AdminLayout>
                        <Login />
                      </AdminLayout>
                    }
                  />
                  <Route
                    path="/contact-us"
                    element={
                      <AdminLayout>
                        <Dashboard />
                      </AdminLayout>
                    }
                  />
                </Route>
              </Routes>
            }
          />

          {/* 
      <Route element={<ProtectRoute />}>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
