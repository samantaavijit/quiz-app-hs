import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "../../utils/helpers/axios";
import { useParams } from "react-router-dom";
import { config } from "../../utils/helpers/token.config";
import { toast } from "react-toastify";
import Loader from "../../utils/loader/Loader";
import "./question.css";

export default function TopicWiseQuestion() {
  const per_page = 20;

  const optionsSymbol = ["A", "B", "C", "D"];

  const [loading, setLoading] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const [allQuestions, setAllQuestions] = useState([]);
  const [lastKey, setLastKey] = useState("");

  const topic = useParams()?.topic;

  useEffect(() => {
    getAllQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  const getAllQuestions = (startAtKey = "") => {
    setLoading(true);

    axios
      .get(
        `/question/topic-wise-question/${topic}?per_page=${per_page}&startAtKey=${startAtKey}`,
        config()
      )
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          let { questions, startAtKey } = res.data;

          let values = Object.values(questions);

          if (startAtKey === lastKey) {
            setIsMore(false);
          } else {
            values.pop();
          }

          setAllQuestions([...allQuestions.concat(values)]);

          setLastKey(startAtKey);
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
    <Container>
      {loading && <Loader />}

      <h1>Topic Name Questions</h1>

      <Row className="py-5">
        {allQuestions.map((item, key) => {
          return (
            <Col xs={12} sm={6} md={3} lg={3} className="p-2" key={key}>
              <Card>
                <Card.Body>
                  <Card.Title className="mt-2">Q. {item.question}</Card.Title>
                  <div className="option-container">
                    {item.options.map((opt, key) => {
                      return (
                        <div className="learning-option " key={key}>
                          <b> {optionsSymbol[key]})</b> {opt}
                        </div>
                      );
                    })}
                  </div>
                  <h5>
                    Ansers: <span className="answer"> {item.answer}</span>
                  </h5>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Button
        className="m-5"
        onClick={() => {
          getAllQuestions(lastKey);
        }}
        disabled={!isMore}
      >
        View More
      </Button>
    </Container>
  );
}
