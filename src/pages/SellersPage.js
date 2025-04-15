// src/pages/SellersPage.js
import React from "react";
import { Table, Container, Badge } from "react-bootstrap";

const dummySellers = [
  {
    name: "CozyNestStudio",
    sales: 9120,
    rating: 4.8,
    favorites: 320,
    location: "USA",
  },
  {
    name: "CraftyWonders",
    sales: 7560,
    rating: 4.9,
    favorites: 410,
    location: "UK",
  },
  {
    name: "EcoArtSpace",
    sales: 6310,
    rating: 4.6,
    favorites: 275,
    location: "Canada",
  },
];

const SellersPage = () => {
  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">Top Etsy Sellers</h3>
      <Table striped bordered hover responsive className="bg-white text-dark">
        <thead>
          <tr>
            <th>Shop Name</th>
            <th>Sales</th>
            <th>Rating</th>
            <th>Favorites</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {dummySellers.map((seller, idx) => (
            <tr key={idx}>
              <td>{seller.name}</td>
              <td>{seller.sales.toLocaleString()}</td>
              <td>⭐ {seller.rating}</td>
              <td>{seller.favorites}</td>
              <td>
                <Badge bg="info">{seller.location}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SellersPage;
