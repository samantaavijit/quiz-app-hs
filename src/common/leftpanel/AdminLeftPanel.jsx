import React from "react";
import { Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./leftpanel.css";

export default function AdminLeftPanel() {
  return (
    <Col lg="3" md="4" sm="12" className="ds_left">
      <div className="left_panel_dash">
        <div className="dash_user_image">
          <div className="dash_user_inner_image">
            <img
              alt="HMC"
              src="https://avatars.githubusercontent.com/u/67010969?v=4"
            />
          </div>
          {/* <Link
              to={`/basic-profile/${hash_id}/1`}
              className="upload-btn-wrapper"
            >
              <div className="upload_edit">
                <i className="fa fa-pencil" aria-hidden="true" />
              </div>
            </Link> */}
        </div>
        <div className="user_name_email">
          <h2>Admin</h2>
          <p>avijit@gmail.com</p>
        </div>
        <div className="dash_menu">
          <Nav as="ul" className="dashmenu_ul">
            <Nav.Item as="li">
              <NavLink to="/admin/dashboard" exact={`${true}`}>
                <span className="pro-icon-wrapper">
                  <i className="fa-solid fa-gears" />
                </span>
                Dashboard
              </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
              <NavLink to="/admin/chapters" exact={`${true}`}>
                <span className="pro-icon-wrapper">
                  <i className="fa-solid fa-gears" />
                </span>
                Chapters
              </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
              <NavLink to="/admin/add-chapter" exact={`${true}`}>
                <span className="pro-icon-wrapper">
                  <i className="fa-solid fa-gears" />
                </span>
                Add Chapter
              </NavLink>
            </Nav.Item>

            <Nav.Item as="li">
              <NavLink to="/admin/add-question" exact={`${true}`}>
                <span className="pro-icon-wrapper">
                  <i className="fa-solid fa-gears" />
                </span>
                Add Question
              </NavLink>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </Col>
  );
}
