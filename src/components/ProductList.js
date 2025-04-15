import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert } from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  if (error)
    return (
      <Alert variant="danger" className="text-center my-5">
        {error}
      </Alert>
    );

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4 fw-bold">Top Trending Products</h3>
      <Table striped bordered hover responsive className="bg-white text-dark">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>7-Day Sales</th>
            <th>Total Sales</th>
            <th>Favorites</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, idx) => (
            <tr key={idx}>
              <td>
                <img
                  src={item.image}
                  alt="product"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </td>
              <td>
                <a
                  href={`https://www.etsy.com/search?q=${encodeURIComponent(
                    item.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              </td>
              <td>${parseFloat(item.price).toFixed(2)}</td>
              <td>{item.week_sales}</td>
              <td>{item.total_sales}</td>
              <td>{item.favorites}</td>
              <td>
                <span className="badge bg-info text-dark">{item.category}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductList;
