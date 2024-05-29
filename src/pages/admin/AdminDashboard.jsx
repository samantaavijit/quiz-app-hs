import React, { useEffect, useState } from "react";
import axios from "../../utils/helpers/axios";
import { adminConfig } from "../../utils/helpers/token.config";
import Loader from "../../utils/loader/Loader";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import { BUCKET_DOMAIN } from "../../utils/helpers/Helper";
import { Link } from "react-router-dom";

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
        <Row>
          <Col md={4} lg={3}>
            <div className="card bg-primary text-white mb-4">
              <div className="card-body p-3">
                <i className="fas fa-users fa-2x" />
                <span className="ms-2">
                  Total Users: {dashboardData.total_users}
                </span>
              </div>
            </div>
          </Col>

          <Col md={4} lg={3}>
            <div className="card bg-warning text-white mb-4">
              <div className="card-body p-3">
                <i className="fas fa-user-plus fa-2x" />
                <span className="ms-2">
                  New Users: {dashboardData.new_users}
                </span>
              </div>
            </div>
          </Col>

          {/* Add more cards for additional data */}
        </Row>
      </div>

      <div id="cards_landscape_wrap-2">
        <Container>
          <Row>
            {dashboardData.total_question?.map((item, key) => {
              return (
                <Col xs={12} sm={6} md={3} lg={3} key={key}>
                  <Link
                    to={`/topic-wise-questions/${item.c_id}?topic_name=${item.name}`}
                  >
                    <div className="card-flyer">
                      <div className="text-box">
                        <div className="image-box">
                          <img
                            src={BUCKET_DOMAIN + item.thumbnail}
                            alt={item.name}
                          />
                        </div>
                        <div className="text-container">
                          <h6>
                            {item.name} : {item.total}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
}
