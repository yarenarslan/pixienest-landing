// src/pages/Dashboard.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ProductList from "../components/ProductList";

const Dashboard = () => {
  return (
    <div className="bg-dark text-white position-relative overflow-hidden">

      {/* Light beam animation */}
      <div
        className="position-absolute top-0 start-50 translate-middle-x bg-pink opacity-25 rounded-circle blur shadow"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(255,192,203,0.4) 0%, transparent 70%)",
          zIndex: 0,
        }}
      ></div>

      {/* Hero Section */}
      <header className="text-center py-5 position-relative z-1">
        <div className="mb-4">
          <span
            role="img"
            aria-label="wand"
            className="display-3 d-inline-block transition-hover"
            style={{ transition: "transform 0.3s" }}
          >
            🪄
          </span>
        </div>
        <h1 className="display-4 fw-bold d-flex justify-content-center align-items-center gap-2">
          PixieNest
        </h1>
        <p className="lead text-light opacity-75">
          A smart SEO and product research tool for Etsy sellers
        </p>
        <a
          href="#features"
          className="btn btn-outline-light btn-lg mt-3 rounded-pill shadow-sm px-4 py-2"
        >
          Launch Demo ↴
        </a>
      </header>

      {/* Features Section */}
      <section id="features" className="py-5 bg-secondary">
        <Container>
          <h2 className="text-center fw-bold mb-5 text-white">
            Why <span className="text-warning">PixieNest?</span>
          </h2>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="h-100 text-center shadow">
                <Card.Body>
                  <div style={{ fontSize: "2rem", color: "#0d6efd" }}>💡</div>
                  <Card.Title className="mt-3 fw-bold">
                    Discover Trendy Products
                  </Card.Title>
                  <Card.Text>
                    Find what’s hot in your niche and make informed decisions with real data.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 text-center shadow">
                <Card.Body>
                  <div style={{ fontSize: "2rem", color: "#198754" }}>📈</div>
                  <Card.Title className="mt-3 fw-bold">Competitor Analysis</Card.Title>
                  <Card.Text>
                    Track pricing, reviews, and popularity of similar listings on Etsy.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 text-center shadow">
                <Card.Body>
                  <div style={{ fontSize: "2rem", color: "#ffc107" }}>🔍</div>
                  <Card.Title className="mt-3 fw-bold">Smart SEO Suggestions</Card.Title>
                  <Card.Text>
                    Improve your listings with keyword suggestions and optimized titles.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 text-center shadow">
                <Card.Body>
                  <div style={{ fontSize: "2rem", color: "#dc3545" }}>⏱️</div>
                  <Card.Title className="mt-3 fw-bold">Save Time</Card.Title>
                  <Card.Text>
                    Automated insights that help you grow faster without spending hours on research.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Unique Benefits */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <h2 className="text-center fw-bold mb-4">
            What Makes <span className="text-warning">PixieNest</span> Different?
          </h2>
          <ul className="list-unstyled fs-5 text-center mx-auto" style={{ maxWidth: "800px" }}>
            <li className="mb-3">✅ Free basic usage – ideal for new sellers</li>
            <li className="mb-3">✅ Combines <strong>Etsy + Google SEO</strong> for maximum visibility</li>
            <li className="mb-3">✅ Analyze competitor listings and get smarter product alternatives</li>
            <li className="mb-3">✅ Browser extension coming soon for on-site real-time analysis</li>
            <li className="mb-3">✅ Get personalized suggestions tailored to your listings</li>
            <li className="mb-3">✅ Flexible pay-as-you-go pricing – no subscriptions needed</li>
          </ul>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <h3 className="text-center fw-bold mb-4">About PixieNest</h3>
          <p className="text-center mx-auto" style={{ maxWidth: "700px" }}>
            PixieNest is designed for Etsy sellers who want to grow faster, smarter.
            With real-time product research, competitor tracking, and SEO guidance,
            it’s your all-in-one dashboard to stand out in a crowded marketplace.
          </p>
        </Container>
      </section>

      {/* Technologies */}
      <section className="py-5 bg-light text-dark">
        <Container>
          <h3 className="text-center fw-bold mb-4">Technologies Used</h3>
          <Row className="text-center">
            <Col md={3}>⚛️ <strong>React</strong></Col>
            <Col md={3}>🐍 <strong>FastAPI (Python)</strong></Col>
            <Col md={3}>🗄️ <strong>PostgreSQL</strong></Col>
            <Col md={3}>📡 <strong>Etsy API</strong></Col>
          </Row>
        </Container>
      </section>

      {/* Preview */}
      <section className="py-5 bg-white text-dark text-center">
        <Container>
          <h3 className="fw-bold mb-4">Preview</h3>
          <p className="text-muted">*Demo preview will be available after Etsy API approval.</p>
        </Container>
      </section>

      {/* ProductList Table (optional for demo) */}
      <section id="demo" className="py-5 bg-light">
        <ProductList />
      </section>

    </div>
  );
};

export default Dashboard;
