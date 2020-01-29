import React, { useState } from "react";
import "./styles.css";

const GRAPHQL_URL =
  "https://graphql-lambda-setup.netlify.com/.netlify/functions/graphql";

const query = `
  query {
    name
    skills {
      frontEnd
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
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Click to find out what raman may know</h1>
      <button className="decent-button" onClick={() => getData()}>
        Get Raman's Info
      </button>
      {loading && <div>...loading</div>}
      {result && !loading && (
        <>
          <h2>{result.data.name}</h2>
          <h3>Some skills</h3>
          <ul className="skills-list">
            {result.data.skills.frontEnd.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
