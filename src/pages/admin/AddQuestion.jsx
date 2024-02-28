import React, { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "../../utils/helpers/axios";
import Loader from "../../utils/loader/Loader";
import { adminConfig } from "../../utils/helpers/token.config";
import _ from "lodash";

export default function AddQuestion() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    c_id: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    year: "",
    hints: "",
    options: [],
  });

  const [selectedChapter, setSeletctedChapter] = useState({});

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

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    formData[name] = value;

    if (name === "c_id" && value) {
      let result = _.find(allChapters, ({ c_id }) => {
        return c_id === value;
      });
      setSeletctedChapter(result);
    }

    setFormData({ ...formData });
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let { optionA, optionB, optionC, optionD } = formData;
    let options = [optionA, optionB, optionC, optionD];

    formData.options = options;

    axios
      .post("/question/add-question", formData, adminConfig())
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          toast.success(res.data.message);
          setFormData({
            c_id: "",
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            answer: "",
            year: "",
            hints: "",
            options: [],
          });
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
    <Row className="p-5">
      <h1>Add Question</h1>
      {loading && <Loader />}

      <Col className="mt-3" md={8}>
        <Form onSubmit={handleOnsubmit}>
          <FloatingLabel controlId="c_id" label="Chapter Name" className="mb-3">
            <Form.Select
              name="c_id"
              aria-label="Default select example"
              required
              onChange={handleOnChange}
              value={formData.c_id}
            >
              <option value="">Select Chapter name</option>
              {allChapters.map((item, key) => {
                return (
                  <option value={item.c_id} key={key}>
                    {item.name}
                  </option>
                );
              })}
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="name" label="Question" className="mb-3">
            <Form.Control
              name="question"
              type="text"
              as="textarea"
              style={{ height: "100px" }}
              placeholder="Enter Questions"
              required
              value={formData.question}
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <Row>
            <Col md={5}>
              <FloatingLabel
                controlId="optionA"
                label="Option A"
                className="mb-3"
              >
                <Form.Control
                  name="optionA"
                  type="text"
                  placeholder="Option A"
                  required
                  value={formData.optionA}
                  onChange={handleOnChange}
                />
              </FloatingLabel>
            </Col>
            <Col md={5}>
              <FloatingLabel
                controlId="optionB"
                label="Option B"
                className="mb-3"
              >
                <Form.Control
                  name="optionB"
                  type="text"
                  placeholder="Option B"
                  required
                  value={formData.optionB}
                  onChange={handleOnChange}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <FloatingLabel
                controlId="optionC"
                label="Option C"
                className="mb-3"
              >
                <Form.Control
                  name="optionC"
                  type="text"
                  placeholder="Option C"
                  required
                  value={formData.optionC}
                  onChange={handleOnChange}
                />
              </FloatingLabel>
            </Col>
            <Col md={5}>
              <FloatingLabel
                controlId="optionD"
                label="Option D"
                className="mb-3"
              >
                <Form.Control
                  name="optionD"
                  type="text"
                  placeholder="Option D"
                  required
                  value={formData.optionD}
                  onChange={handleOnChange}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <FloatingLabel controlId="answer" label="Answer" className="mb-3">
                <Form.Control
                  name="answer"
                  type="text"
                  placeholder="Answer"
                  required
                  value={formData.answer}
                  onChange={handleOnChange}
                />
              </FloatingLabel>
            </Col>
            <Col md={5}>
              <FloatingLabel controlId="year" label="Year" className="mb-3">
                <Form.Control
                  name="year"
                  type="text"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleOnChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel controlId="hints" label="Hints" className="mb-3">
            <Form.Control
              name="hints"
              type="text"
              as="textarea"
              style={{ height: "100px" }}
              placeholder="Enter Hints"
              value={formData.hints}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          <Button className="mt-2" type="submit">
            Add
          </Button>
        </Form>
      </Col>
      <Col md={1}>
        <img
          width={250}
          height={250}
          src={selectedChapter.thumbnail}
          alt="thumbnail"
        />
      </Col>
    </Row>
  );
}
