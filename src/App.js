import React, { useState } from "react";
import "./styles.css";

const GRAPHQL_URL =
  "https://graphql-sdm-poc.netlify.com/.netlify/functions/graphql";

const productID = "814391015914";
const query = `
  query product {
    product(id: ${productID}) {
      id
      name
      description
      image
    }
  }
`;
const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
};

export default function App() {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const rawResult = await fetch(GRAPHQL_URL, opts);

      const results = await rawResult.json();
      setResult(results);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={() => getData()}> Click me!</button>
      {loading && <div>...loading</div>}
      {result && !loading && (
        <>
          <h2>{result.data.product.name}</h2>
          <p>{result.data.product.description}</p>
        </>
      )}
    </div>
  );
}
