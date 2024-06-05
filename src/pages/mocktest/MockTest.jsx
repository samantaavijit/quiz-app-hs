import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import { toast } from "react-toastify";
import { config } from "../../utils/helpers/token.config";
import axios from "../../utils/helpers/axios";
import { Link } from "react-router-dom";
import "./mocktest.css";

export default function MockTest() {
  const [loading, setLoading] = useState(false);

  const [allMockTest, setAllMockTest] = useState([]);

  useEffect(() => {
    getAllMockTest();
  }, []);

  const getAllMockTest = () => {
    setLoading(true);
    axios
      .get("/question/get-mock-test", config())
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          let { mock_test } = res.data;
          setAllMockTest(mock_test);
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

  const getTimeFormat = (marks, each_time) => {
    let seconds = marks * each_time;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes = minutes > 9 ? minutes : `0${minutes}`;
    seconds = seconds > 9 ? seconds : `0${seconds}`;

    return minutes + ":" + seconds;
  };

  return (
    <div id="mock_test">
      {loading && <Loader />}

      <h1>All Mock Test</h1>

      <Container>
        <Row>
          {allMockTest.map((item, key) => {
            return (
              <Col xs={12} sm={6} md={3} lg={3} key={key}>
                <Link
                  to={`/topic-wise-questions/${item.c_id}?topic_name=${item.name}`}
                >
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="text-container">
                        <h6>{item.name}</h6>
                        <p>
                          Topic : <b>{item.topic}</b>
                        </p>
                        <p>
                          Marks : <b>{item.marks}</b>
                        </p>
                        <p>
                          Time : <b>{getTimeFormat(item.marks, item.time)}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>

        {/* <div className="complete">
          <div className="label">Completed</div>
          <div className="text-box">
            <div className="text-container">
              <h6>sdgsdt</h6>
            </div>
          </div>
        </div>

        <div className="inprogress">
                    <div className="label">Inprogress</div>
                    <div className="text-box">
                      <div className="text-container">
                        <h6>{item.name}</h6>
                      </div>
                    </div>
                  </div> */}
      </Container>
    </div>
  );
}
