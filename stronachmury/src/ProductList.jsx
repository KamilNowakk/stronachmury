import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Funkcja do pobierania produktów z backendu
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Funkcja do usuwania produktu
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProducts(products.filter((product) => product.id !== id));
      alert("Produkt usunięty!");
    } else {
      alert("Błąd podczas usuwania produktu!");
    }
  };

  return (
    <div>
      <h1>Produkty</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} PLN</p>
            <p>{product.category}</p>
            <button onClick={() => handleDelete(product.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
