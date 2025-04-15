import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Badge } from "react-bootstrap";

const KeywordsPage = () => {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/keywords")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setKeywords(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center my-5"><Spinner animation="border" variant="light" /></div>;
  if (error) return <Alert variant="danger" className="text-center my-5">{error}</Alert>;

  return (
    <Container className="my-5 text-white">
      <h3 className="text-center mb-4">Keyword Insights</h3>
      <Table striped bordered hover responsive className="bg-white text-dark">
        <thead>
          <tr>
            <th>Keyword</th>
            <th>Search Volume</th>
            <th>Competition</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((item, idx) => (
            <tr key={idx}>
              <td>{item.keyword}</td>
              <td>{item.search_volume.toLocaleString()}</td>
              <td>
                <Badge bg={
                  item.competition === "low" ? "success" :
                  item.competition === "medium" ? "warning" : "danger"
                }>
                  {item.competition}
                </Badge>
              </td>
              <td>
                <Badge bg={
                  item.trend === "rising" ? "info" :
                  item.trend === "falling" ? "danger" : "secondary"
                }>
                  {item.trend}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default KeywordsPage;
