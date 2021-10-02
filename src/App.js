import React, { useEffect } from "react";
import { useState } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  useEffect(() => {
    getLocalTodos();
  }, []);
// eslint-disable-next-line
  useEffect(() => {filterHandler(); saveLocalTodos()}, [status, todos]); 

  const filterHandler = () => {
    switch(status){
      case 'completed' : 
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'incomplete' : 
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
  }}

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }



  return (
    <div className="App">
    <header><h1>
      My To-Do List
    </h1></header>

    <Form setInputText = {setInputText} setTodos = {setTodos} todos = {todos} inputText = {inputText} status = {status} setStatus = {setStatus} />

    <TodoList todos = {todos} setTodos = {setTodos} filteredTodos = {filteredTodos}/>
    </div>
  );
}

export default App;
