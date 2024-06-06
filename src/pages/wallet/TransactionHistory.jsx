import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import { toast } from "react-toastify";
import { config } from "../../utils/helpers/token.config";
import axios from "../../utils/helpers/axios";
import moment from "moment";

export default function TransactionHistory() {
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    getAllTransaction();
  }, []);

  const getAllTransaction = () => {
    setLoading(true);
    axios
      .get("/wallet/all-transactions", config())
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          let { transaction } = res.data;

          setAllTransaction(transaction);
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

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setShowModal(false);

    setLoading(true);
    axios
      .post("/wallet/add-balance", { balance }, config())
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

  const handleClose = () => {
    setBalance("");
    setShowModal(false);
  };

  return (
    <Container>
      {loading && <Loader />}

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Amount</Form.Label>
              <Form.Control
                name="balance"
                value={balance}
                type="text"
                placeholder="0"
                onChange={(e) => {
                  setBalance(e.target.value.replace(/[^0-9]/g, ""));
                }}
                required
              />
            </Form.Group>
            <Button type="submit" className="m-3">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Row className="mt-3">
        <Col>
          <h1>All Transactions</h1>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            Add Payment
          </Button>
        </Col>
      </Row>

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Balance</th>
            <th>Payment Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {allTransaction.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item._id}</td>
                <td>{item.balance}</td>
                <td>{moment(item.date).format("DD-MMM-YYYY")}</td>
                {/* <td>{item.status ? "Success" : "Pending"}</td> */}
                <td>
                  <h5>
                    <Badge bg={item.status ? "success" : "danger"}>
                      {item.status ? "Success" : "Pending"}
                    </Badge>
                  </h5>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
