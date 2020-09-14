import React from "react"
import ReactDOM from "react-dom"

const App = () => {
  return (
    <div className="container">
      <h1 className="title">@(Навигация)</h1>
      <h3><a href="/transactions.html">Транзакции</a></h3>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"))

