import React, { useEffect, useState } from "react";
import "./dashboard.css";
import axios from "../../utils/helpers/axios";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import { Link } from "react-router-dom";
import { config } from "../../utils/helpers/token.config";
import { BUCKET_DOMAIN } from "../../utils/helpers/Helper";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  const [allChapters, setAllChapters] = useState([]);

  useEffect(() => {
    getAllChatpers();
  }, []);

  const getAllChatpers = () => {
    setLoading(true);
    axios
      .get("/question/all-chapters", config())
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          let { chapters } = res.data;
          setAllChapters(chapters);
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
    <div id="cards_landscape_wrap-2">
      {loading && <Loader />}

      <Container>
        <Row>
          {allChapters.map((item, key) => {
            return (
              <Col xs={12} sm={6} md={3} lg={3} key={key}>
                <Link to={`/topic-wise-questions/${item.c_id}`}>
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <img
                          src={BUCKET_DOMAIN + item.thumbnail}
                          alt={item.name}
                        />
                      </div>
                      <div className="text-container">
                        <h6>{item.name}</h6>
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
  );
}
