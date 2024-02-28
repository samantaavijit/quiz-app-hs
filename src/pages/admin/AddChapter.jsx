import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { getChapterId, getFileExtension } from "../../utils/helpers/Helper";
import _ from "lodash";
import axios from "../../utils/helpers/axios";
import Loader from "../../utils/loader/Loader";
import { adminConfig } from "../../utils/helpers/token.config";

export default function AddChapter() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    c_id: "",
    thumbnail: "",
  });

  const [image, setImage] = useState(null);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    formData[name] = value;

    setFormData({ ...formData });
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();

    addNewChapter();
  };

  const uploadImage = () => {
    setLoading(true);

    let formData = new FormData();
    formData.append("image", image);

    axios
      .post("/question/upload-thumbnail", formData)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong!!");
      });
  };

  const addNewChapter = () => {
    setLoading(true);
    formData.c_id = getChapterId(formData.name);

    axios
      .post("/question/add-chapter", formData, adminConfig())
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
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

  const handleImages = (e) => {
    e.persist();

    let file = e.target.files[0];
    let validExtension = ["png", "jpg", "jpeg"];
    if (file !== undefined) {
      let extension = getFileExtension(file);
      if (
        extension !== undefined &&
        _.findIndex(validExtension, (exe) => {
          return exe === extension;
        }) !== -1
      ) {
        setImage(file);
      } else {
        toast.error("The file format is not supported");
      }
    }
  };

  return (
    <Row className="pt-5">
      <h1>Add Chapter</h1>
      {loading && <Loader />}

      <Col className="mt-3" md={6}>
        <Form onSubmit={handleOnsubmit}>
          <FloatingLabel controlId="name" label="Chapter Name" className="mb-3">
            <Form.Control
              name="name"
              type="text"
              placeholder="HTML, Logic Gate, ...."
              required
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="name"
            label="Thumbnail URL"
            className="mb-3"
          >
            <Form.Control
              name="thumbnail"
              type="text"
              placeholder="https://ab.dd.png"
              required
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="thumbnail" label="Chapter image">
            <Form.Control
              type="file"
              placeholder="Password"
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleImages}
              // required
            />
          </FloatingLabel>

          <Button className="mt-5" type="submit">
            Add
          </Button>
        </Form>
      </Col>
      <Col md={3}>
        {image && (
          <img
            width={250}
            height={250}
            src={URL.createObjectURL(image)}
            alt="thumbnail"
          />
        )}
      </Col>
    </Row>
  );
}
