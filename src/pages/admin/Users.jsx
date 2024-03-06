import React, { useEffect, useState } from "react";
import Loader from "../../utils/loader/Loader";
import { adminConfig } from "../../utils/helpers/token.config";
import { toast } from "react-toastify";
import axios from "../../utils/helpers/axios";
import { Dropdown, Image, Table } from "react-bootstrap";

export default function Users() {
  const [loading, setLoading] = useState(false);

  const [allUsers, setAllUsers] = useState([]);

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

  const handleAction = (action, userId) => {
    // Handle the action here
    console.log(`Performing ${action} action for user ${userId}`);
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

  return (
    <div>
      {loading && <Loader />}
      <h1>Users</h1>
      <Table striped bordered hove>
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
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.active ? "Active" : "In active"}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">...</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => toogleUserStatus(item._id)}>
                        {item.active ? "Disable" : "Enable"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleAction("delete", item.id)}
                      >
                        Delete
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
