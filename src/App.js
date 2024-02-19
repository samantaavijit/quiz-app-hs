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
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

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
                </Route>
              </Routes>
            }
          />

          {/* <Route path="/admin" element={<AdminLogin />}>
            <Route path="*" element={<AdminProtectRoute />}>
              <Route
                path="/dashboard"
                element={
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                }
              />
            </Route>
          </Route> */}

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
