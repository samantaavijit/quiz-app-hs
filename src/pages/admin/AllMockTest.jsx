import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import { toast } from "react-toastify";
import { adminConfig } from "../../utils/helpers/token.config";
import axios from "../../utils/helpers/axios";

export default function AllMockTest() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allChapters, setAllChapters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    marks: 15,
    time: 10,
    topic: "",
  });

  useEffect(() => {
    getAllChatpers();
  }, []);

  const getAllChatpers = () => {
    setLoading(true);
    axios
      .get("/question/all-chapters", adminConfig())
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

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      marks: 15,
      time: 10,
      topic: "",
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    formData[name] = value;

    setFormData({ ...formData });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setShowModal(false);

    setLoading(true);

    axios
      .post("/question/add-mock-test", formData, adminConfig())
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          handleClose();
          toast.success(res.data.message);
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

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Mock Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Mock Test Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                type="text"
                placeholder="Enter Mock Test Name"
                onChange={handleOnChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mock Test Marks</Form.Label>
              <Form.Select
                name="marks"
                value={formData.marks}
                onChange={handleOnChange}
                required
              >
                <option value={15}>15</option>
                <option value={20}>20</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time For Each Question</Form.Label>
              <Form.Select
                name="time"
                value={formData.time}
                onChange={handleOnChange}
                required
              >
                <option value={10}>10 Sec</option>
                <option value={15}>15 Sec</option>
                <option value={20}>20 Sec</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Topic</Form.Label>
              <Form.Select
                name="topic"
                value={formData.topic}
                onChange={handleOnChange}
                required
              >
                <option value="">Select Topic</option>
                {allChapters.map((item, key) => {
                  return (
                    <option value={item._id} key={key}>
                      {item.name}
                    </option>
                  );
                })}
                <option value="All Topics">All Topics</option>
              </Form.Select>

              <Button type="submit" className="m-3">
                Add
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      <Row>
        <Col>
          <h1>All Mock Test</h1>
        </Col>
        <Col>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            Create Mock Test
          </button>
        </Col>
      </Row>

      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
