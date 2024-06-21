import React, { useEffect, useState } from "react";
import Loader from "../../utils/loader/Loader";
import { adminConfig } from "../../utils/helpers/token.config";
import { toast } from "react-toastify";
import axios from "../../utils/helpers/axios";
import {
  Badge,
  Button,
  Dropdown,
  Form,
  Image,
  Modal,
  Table,
} from "react-bootstrap";

export default function Users() {
  const [loading, setLoading] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [editUserDetails, setEditUserDetails] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    setLoading(true);
    axios
      .get(`/user/all-users`, adminConfig())
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          let { users } = res.data;
          setAllUsers(users);
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

  const toogleUserStatus = (id) => {
    setLoading(true);

    axios
      .put("/user/toogle-user-status", { id }, adminConfig())
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success(res.data.message);
          getAllUsers();
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
    setEditUserDetails({
      id: "",
      name: "",
      email: "",
    });
  };

  const updateUserDetails = (e) => {
    e.preventDefault();

    setLoading(true);
    setShowModal(false);

    axios
      .put("/user/update-user-details", editUserDetails, adminConfig())
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          handleClose();
          toast.success(res.data.message);
          getAllUsers();
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
          <Modal.Title>Update User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateUserDetails}>
            <Form.Group className="mb-3">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                name="name"
                value={editUserDetails.name}
                type="text"
                placeholder="name"
                onChange={(e) => {
                  editUserDetails.name = e.target.value;
                  setEditUserDetails({ ...editUserDetails });
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={editUserDetails.email}
                type="text"
                placeholder="0"
                readOnly
              />
            </Form.Group>
            <Button type="submit" className="m-3">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h1>Users</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allUsers.map((item, key) => {
            return (
              <tr key={key}>
                <td>
                  <Image
                    src={item.avatar}
                    roundedCircle
                    width="40"
                    height="40"
                  />
                </td>
                <td>
                  {item.name}
                  <Badge className="ms-2" bg="success">
                    {item.balance}
                  </Badge>
                </td>
                <td>{item.email}</td>
                <td>
                  <h5>
                    <Badge bg={item.active ? "success" : "danger"}>
                      {item.active ? "Active" : "In Active"}
                    </Badge>
                  </h5>
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">...</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => toogleUserStatus(item._id)}>
                        {item.active ? "Disable" : "Enable"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setShowModal(true);
                          const { _id, name, email } = item;
                          editUserDetails.id = _id;
                          editUserDetails.name = name;
                          editUserDetails.email = email;
                          setEditUserDetails({ ...editUserDetails });
                        }}
                      >
                        Edit
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
