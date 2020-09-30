import React from "react"
import ReactDOM from "react-dom"

const App = () => {
  return (
    <div className="container">
      <h1 className="title">@(Навигация)</h1>
      <h3><a href="./transactions.html">Транзакции</a></h3>
      <h3><a href="./groupForm.html">Группы</a></h3>
      <h3><a href="./packageForm.html">Пакет</a></h3>
      <h3><a href="./regForm.html">Регистрация</a></h3>
      <h3><a href="./accountsForm.html">Аккаунты</a></h3>
      <h3><a href="./debtForm.html">Должники</a></h3>      
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"))

