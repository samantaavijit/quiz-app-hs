import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/helpers/axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import { config } from "../../utils/helpers/token.config";

export default function StartQuiz() {
  const [loading, setLoading] = useState(false);
  const optionsSymbol = ["A", "B", "C", "D"];

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);

  const topic_name = queryParams.get("topic_name");
  const topic_id = queryParams.get("topic_id");
  const expiresIn = queryParams.get("expiresIn");
  const totalQuestions = queryParams.get("questions");

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(-1);

  useEffect(() => {
    if (expiresIn && isTimeExpire(expiresIn)) {
      toast.error("Quiz link is invalid. Please try again");
      navigate("/show-quiz-topic");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllQuiz = () => {
    if (!topic_name || !totalQuestions || !topic_id || !expiresIn) {
      toast.error("Quiz link is invalid. Please try again");
      navigate("/show-quiz-topic");
      return;
    }

    setLoading(true);

    axios
      .get(
        `/question/get-quiz-question?topic_id=${topic_id}&totalQuestions=${totalQuestions}`,
        config()
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          let { questions } = res.data;
          setAllQuestions(questions);
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

  const isTimeExpire = (expiresIn) => Date.now() > expiresIn;

  const optionClicked = (position) => {
    setClickedOption(position);

    // checked option is correct or not
    let { answer, options } = allQuestions[currentQuestion];

    let optionselect = options[position];

    if (answer === optionselect) {
      setScore(score + 1);
    }
  };

  const changeQuestion = () => {
    if (currentQuestion === allQuestions.length - 1) {
      // SHOW RESULT
      toast.success("Your core " + score);

      return;
    }

    setClickedOption(-1);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <Container>
      {loading && <Loader />}
      <h1>{topic_name} Quiz APP</h1>

      {allQuestions.length === 0 && (
        <Button
          variant="danger"
          onClick={() => {
            getAllQuiz();
          }}
        >
          START
        </Button>
      )}

      <Row className="py-5">
        {allQuestions.length > 0 && (
          <Col xs={12} sm={6} md={3} lg={3} className="p-2">
            <Card>
              <Card.Body>
                <Card.Title className="mt-2">
                  {currentQuestion + 1}.{" "}
                  {allQuestions[currentQuestion].question}
                </Card.Title>
                <div className="option-container">
                  {allQuestions[currentQuestion].options.map((opt, key) => {
                    return (
                      <button
                        disabled={clickedOption !== -1}
                        className={`option-btn ${
                          clickedOption === key ? "checked" : ""
                        } `}
                        key={key}
                        onClick={() => {
                          optionClicked(key);
                        }}
                      >
                        <b> {optionsSymbol[key]})</b> {opt}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="button"
                  value="Next"
                  id="next-button"
                  onClick={changeQuestion}
                />
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}
