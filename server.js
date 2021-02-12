const express = require("express");
const app = express();
const bodyParser = require("body-parser");

var cors = require("cors");
const port = 4000;

let dbTodos = [{
  id: 1,
  title: "Example",
  completed: false,
  date: "day-month-year"
}, ];
app.use(cors());
app.use(bodyParser.json());

app
  .route("/api/todos")
  .get((req, res) => {
    console.log(req.query);
    let result = JSON.stringify({
      data: dbTodos
    });
    return res.status(200).send(result);
  })
  .post((req, res) => {
    const todo = req.body;
    todo.id = Date.now();
    dbTodos.push(todo);
    let result = JSON.stringify({
      data: todo
    });
    return res.status(200).send(result);
  })
  .put((req, res) => {
    console.log(req.body);
    const idSave = req.body.id;
    const completed = req.body.completed;
    dbTodos.forEach(function (item) {
      if (item.id === idSave) {
        item.completed = completed;
      }
    });
    console.log(dbTodos);
    let answer = '';
    dbTodos.forEach(function (item) {
      if (item.id === idSave) {
        answer = item.completed;
      }
    });
    let result = JSON.stringify({
      data: answer
    });
    return res.status(200).send(result);
  })
  .delete((req, res) => {
    console.log(req.body);
    const idDelete = req.body.id;
    const newDataBase = [];
    dbTodos.forEach(function (item) {
      if (item.id !== idDelete) {
        newDataBase.push(item);
      }
    });
    dbTodos = newDataBase;
    console.log(dbTodos);
    let answer = "";
    if (dbTodos.every(function (item) {
        return item.id !== idDelete;
      })) {
      answer = true;
    } else {
      answer = false;
    }
    let result = JSON.stringify({
      data: answer
    });
    return res.status(200).send(result);
  });

app.listen(port, () => console.log(`server start  port ${port}`));