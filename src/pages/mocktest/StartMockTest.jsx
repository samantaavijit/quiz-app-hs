import { useEffect, useState } from "react";
import { Button, Card, Container, ProgressBar } from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import { toast } from "react-toastify";
import { config } from "../../utils/helpers/token.config";
import axios from "../../utils/helpers/axios";
import { useParams } from "react-router-dom";

export default function StartMockTest() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = useParams()?.id;
  const name = queryParams.get("name");
  const marks = queryParams.get("marks");
  const time = queryParams.get("time");

  const [loading, setLoading] = useState(false);
  const [isQuizStart, setIsQuizStart] = useState(false);
  const [questionPosition, setQuestionPosition] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [ansers, setAnsers] = useState([]);
  const [seconds, setSeconds] = useState(time);
  const optionsSymbol = ["A", "B", "C", "D"];

  let timer;
  let count = 0;

  useEffect(() => {
    // if (!isQuizStart) return;
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      return (event.returnValue = ""); // For some browsers to show the default dialog
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const startMockTest = () => {
    setLoading(true);
    axios
      .get(`/question/get-mock-test/${id}`, config())
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setIsQuizStart(true);
          let { mock_test } = res.data;
          setQuestions(mock_test);
          startTimer();
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

  const startTimer = () => {
    timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(timer); // Stop the timer when seconds reach 0
          setSeconds(time);
          getNextQuestion();
          return 0;
        }
        return prevSeconds - 1; // Decrease seconds by 1
      });
    }, 1000); // Update every second
  };

  const stopTimer = () => {};

  const getNextQuestion = () => {
    count++;
    if (questions.length === count) {
      // Question End And Submit the result
      return;
    }
    setQuestionPosition(count);
    startTimer();
  };

  return (
    <div id="mock_test">
      {loading && <Loader />}
      {/* {console.log("questionPosition", questionPosition)} */}

      {!isQuizStart ? (
        <Card className="m-3">
          <Card.Body className="m-2">
            <h3>{name} Mock Test Overview</h3>
            <Card.Title>Experience Real Exam Conditions</Card.Title>
            <p className="text-justify">
              Welcome to our <b>{name}</b> Mock Test section, where you can
              experience real exam conditions from the comfort of your home. Our
              comprehensive mock tests are designed to replicate the actual test
              environment, helping you prepare effectively for your upcoming
              exams.
            </p>
            <h5 className="text-start">Key Features</h5>

            <ul>
              <li className="text-justify">
                <b>Simulated Exam Environment:</b> Our <b>{name}</b> mock tests
                mimic the format, timing, and question types of the real exam,
                providing you with an authentic practice experience.
              </li>
              <li className="text-justify">
                <b>Extensive Question Bank:</b> Access a vast repository of
                questions covering all aspects of logic gates, from basic
                concepts to complex applications. Each test is curated by
                subject matter experts to ensure accuracy and relevance.
              </li>
              <li className="text-justify">
                <b>Timed Questions:</b> Each question in the <b>{name}</b> mock
                test is timed to enhance your time management skills. You have{" "}
                <b>{time}</b> seconds to answer each question, helping you learn
                to think quickly and accurately under pressure.
              </li>
              <li className="text-justify">
                <b>Marks Allocation:</b> The <b>{name}</b> mock test is out of a
                total of <b>{marks}</b> marks.
              </li>
            </ul>

            <Button variant="danger" onClick={startMockTest}>
              START
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Container>
          <Card className="mt-3">
            <ProgressBar>
              <ProgressBar striped variant="success" now={35} key={1} />
              <ProgressBar variant="warning" now={20} key={2} />
              <ProgressBar striped variant="danger" now={10} key={3} />
            </ProgressBar>
            <Card.Body>
              <div className="right-align">00:{seconds}</div>
              <Card.Title>
                {questionPosition + 1}. {questions[questionPosition]?.question}
              </Card.Title>

              <div className="option-container">
                {questions[questionPosition]?.options?.map((opt, key) => {
                  return (
                    <div className="learning-option " key={key}>
                      <b> {optionsSymbol[key]})</b> {opt}
                    </div>
                  );
                })}
              </div>

              <Button variant="primary" className="mb-2">
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Container>
      )}
    </div>
  );
}
