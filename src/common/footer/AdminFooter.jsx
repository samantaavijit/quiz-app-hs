import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./footer.css";

export default function AdminFooter() {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={6}
            className="text-md-start text-center mb-3 mb-md-0"
          >
            &copy; {new Date().getFullYear()}
          </Col>
          <Col xs={12} md={6} className="text-md-end text-center">
            <div className="social-icons">
              <CircleIcon
                color="google"
                url="https://maps.app.goo.gl/Tx8cNojxAbbLvEa76"
                icon="fa-solid fa-location-dot"
              />
              <CircleIcon
                color="facebook"
                url="tel:+91 8145263799"
                icon="fa-solid fa-phone"
              />
              <CircleIcon
                color="linkedin"
                url="https://wa.me/918145263799"
                icon="fa-brands fa-whatsapp"
              />
              <CircleIcon
                color="google"
                url="mailto:samantaavijit.2000@gmail.com"
                icon="fa-solid fa-envelope"
              />

              <CircleIcon
                color="facebook"
                // url="https://www.facebook.com/avijit.samanta.12914/"
                url="https://www.facebook.com/"
                icon="fa-brands fa-facebook-f"
              />
              <CircleIcon
                color="twitter"
                url="https://www.facebook.com"
                icon="fa-brands fa-twitter"
              />
              <CircleIcon
                color="instagram"
                url="https://www.instagram.com/avijitsamanta2017/"
                icon="fa-brands fa-instagram"
              />
              <CircleIcon
                color="linkedin"
                url="https://www.linkedin.com/in/avijit-samanta-338275157/"
                icon="fa-brands fa-linkedin-in"
              />
              <CircleIcon
                color="github"
                url="https://github.com/samantaavijit"
                icon="fa-brands fa-github"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

const CircleIcon = ({ color, url, icon }) => {
  return (
    <a
      className={`circle-icon ${color}`}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <i className={icon} />
    </a>
  );
};
