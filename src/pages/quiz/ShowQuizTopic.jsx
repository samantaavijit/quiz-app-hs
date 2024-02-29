import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import axios from "../../utils/helpers/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { all_chapter } from "../../assets/images";

export default function ShowQuizTopic() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [topic, setTopic] = useState({});
  const [totalQuestion, setTotalQuestion] = useState(10);
  const [allChapters, setAllChapters] = useState([]);

  useEffect(() => {
    getAllChatpers();
  }, []);

  const getAllChatpers = () => {
    setLoading(true);
    axios
      .get("/question/all-chapters")
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

      <Modal
        show={modalOpen}
        onHide={() => {
          setModalOpen(false);
          setTopic({});
          setTotalQuestion(10);
        }}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Marks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setTotalQuestion(e.target.value);
            }}
            value={totalQuestion}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setModalOpen(false);

              const currentTimestamp = Date.now();
              // Add 15 minutes (900,000 milliseconds) to the current timestamp
              const expirationTimestamp = currentTimestamp + 15 * 60 * 1000;

              let { name, c_id } = topic;

              let url = `/start-quiz?topic_name=${name}&topic_id=${c_id}&expiresIn=${expirationTimestamp}&questions=${totalQuestion}`;
              navigate(url);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row>
          {allChapters.map((item, key) => {
            return (
              <Col xs={12} sm={6} md={3} lg={3} key={key}>
                <Link
                  to="#"
                  onClick={() => {
                    setModalOpen(true);
                    setTopic(item);
                  }}
                >
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <img src={item.thumbnail} alt={item.name} />
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
          <Col xs={12} sm={6} md={3} lg={3}>
            <Link
              to="#"
              onClick={() => {
                setModalOpen(true);
                setTopic({
                  name: "All Chapters",
                  c_id: "all_chapters",
                });
              }}
            >
              <div className="card-flyer">
                <div className="text-box">
                  <div className="image-box">
                    <img src={all_chapter} alt="All Chapters" />
                  </div>
                  <div className="text-container">
                    <h6>All Chapters</h6>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
