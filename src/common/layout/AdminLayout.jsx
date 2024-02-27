import React from "react";
import AdminHeader from "../header/AdminHeader";
import Footer from "../footer/Footer";
import AdminLeftPanel from "../leftpanel/AdminLeftPanel";
import { Col, Container, Row } from "react-bootstrap";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      <div className="home_new">
        <section className="dashboard_part">
          <Container fluid>
            <Row>
              <AdminLeftPanel />

              <Col lg="9" md="8" sm="12" className="ds_right">
                {children}
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  );
}
