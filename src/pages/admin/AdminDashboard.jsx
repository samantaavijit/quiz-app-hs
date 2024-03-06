import React, { useEffect, useState } from "react";
import axios from "../../utils/helpers/axios";
import { adminConfig } from "../../utils/helpers/token.config";
import Loader from "../../utils/loader/Loader";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);

  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = () => {
    setLoading(true);
    axios
      .get("/user/dashboard-data", adminConfig())
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          let { dashboard } = res.data;
          setDashboardData(dashboard);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong!!");
      });
  };

  return (
    <div>
      {loading && <Loader />}
      <h1>Admin Dashboards</h1>
      <div className="mt-5">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <i className="fas fa-users fa-2x"></i>
                <span className="ml-2">
                  Total Users: {dashboardData.total_users}
                </span>
              </div>
            </div>
          </div>
          {dashboardData.total_question?.map((item, key) => {
            return (
              <div className="col-lg-3 col-md-6" key={key}>
                <div className="card bg-success text-white mb-4">
                  <div className="card-body">
                    <i className="fas fa-question fa-2x"></i>
                    <span className="ml-2">
                      Total {item.chapters.name} Questions: {item.total}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="col-lg-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <i className="fas fa-user-plus fa-2x"></i>
                <span className="ml-2">Total New Users: 20</span>
              </div>
            </div>
          </div>
          {/* Add more cards for additional data */}
        </div>
      </div>
    </div>
  );
}
