import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Ładowanie...");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Błąd podczas ładowania."));
  }, []);

  return (
    <div className="App">
      <h1>Witaj na stronie React + Azure!</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
