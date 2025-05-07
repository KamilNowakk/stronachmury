import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, description, price, category };

    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      alert("Produkt dodany!");
    } else {
      alert("Błąd przy dodawaniu produktu!");
    }
  };

  return (
    <div>
      <h1>Dodaj produkt</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nazwa:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Opis:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Cena:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Kategoria:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <button type="submit">Dodaj produkt</button>
      </form>
    </div>
  );
};

export default AddProduct;
