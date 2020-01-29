import React from "react";
import { Row, Col } from "antd";

import "./MainBanner.scss";

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="main-banner__dark" />
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <h2>
            Aprende nuevas <br /> tecnologías web y móvil.
          </h2>
          <h3>
            A través de cursos práctivos, concisos y actualizados, creados por{" "}
            <br />
            profesionales con años de experiencia.
          </h3>
        </Col>
        <Col lg={4} />
      </Row>
    </div>
  );
}
