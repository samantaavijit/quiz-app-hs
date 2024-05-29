import React, { useEffect, useState } from "react";
import { BUCKET_DOMAIN } from "../../utils/helpers/Helper";
import { Col, Dropdown, Row, Table } from "react-bootstrap";
import Loader from "../../utils/loader/Loader";
import { toast } from "react-toastify";
import { adminConfig } from "../../utils/helpers/token.config";
import axios from "../../utils/helpers/axios";
import { Link } from "react-router-dom";

export default function Chapters() {
  const [loading, setLoading] = useState(false);

  const [allChapters, setAllChapters] = useState([]);

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

  return (
    <div>
      {loading && <Loader />}

      <Row>
        <Col>
          <h1>All Chapters</h1>
        </Col>
        <Col>
          <Link className="btn btn-primary" to="/admin/add-chapter">
            Add Chapter
          </Link>
        </Col>
      </Row>

      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allChapters.map((item, key) => {
            return (
              <tr key={key}>
                <td>
                  <img
                    width={150}
                    height={100}
                    src={BUCKET_DOMAIN + item.thumbnail}
                    alt={item.name}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.active ? "Active" : "In active"}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">...</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                      //   onClick={() => toogleUserStatus(item._id)}
                      >
                        {item.active ? "Disable" : "Enable"}
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
