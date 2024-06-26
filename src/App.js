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
import AddChapter from "./pages/admin/AddChapter";
import AddQuestion from "./pages/admin/AddQuestion";
import TopicWiseQuestion from "./pages/topicwisequestion/TopicWiseQuestion";
import ShowQuizTopic from "./pages/quiz/ShowQuizTopic";
import StartQuiz from "./pages/quiz/StartQuiz";
import Users from "./pages/admin/Users";
import Chapters from "./pages/admin/Chapters";
import MockTest from "./pages/mocktest/MockTest";
import AllMockTest from "./pages/admin/AllMockTest";
import StartMockTest from "./pages/mocktest/StartMockTest";
import TransactionHistory from "./pages/wallet/TransactionHistory";
import AllPayments from "./pages/admin/AllPayments";

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

          <Route element={<ProtectRoute />}>
            <Route
              path="/dashboard"
              element={
                <UserLayout>
                  <Dashboard />
                </UserLayout>
              }
            />
            <Route
              path="/topic-wise-questions/:topic"
              element={
                <UserLayout>
                  <TopicWiseQuestion />
                </UserLayout>
              }
            />
            <Route
              path="/show-quiz-topic"
              element={
                <UserLayout>
                  <ShowQuizTopic />
                </UserLayout>
              }
            />
            <Route
              path="/start-quiz"
              element={
                <UserLayout>
                  <StartQuiz />
                </UserLayout>
              }
            />
            <Route
              path="/mock-test"
              element={
                <UserLayout>
                  <MockTest />
                </UserLayout>
              }
            />
            <Route
              path="/start-mock-test/:id"
              element={
                <UserLayout>
                  <StartMockTest />
                </UserLayout>
              }
            />
            <Route
              path="/transaction"
              element={
                <UserLayout>
                  <TransactionHistory />
                </UserLayout>
              }
            />
          </Route>

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
                    path="/chapters"
                    element={
                      <AdminLayout>
                        <Chapters />
                      </AdminLayout>
                    }
                  />
                  <Route
                    path="/add-chapter"
                    element={
                      <AdminLayout>
                        <AddChapter />
                      </AdminLayout>
                    }
                  />
                  <Route
                    path="/add-question"
                    element={
                      <AdminLayout>
                        <AddQuestion />
                      </AdminLayout>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <AdminLayout>
                        <Users />
                      </AdminLayout>
                    }
                  />
                  <Route
                    path="/all-mock-test"
                    element={
                      <AdminLayout>
                        <AllMockTest />
                      </AdminLayout>
                    }
                  />
                  <Route
                    path="/payments"
                    element={
                      <AdminLayout>
                        <AllPayments />
                      </AdminLayout>
                    }
                  />
                </Route>
              </Routes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
