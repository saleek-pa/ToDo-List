import React from "react";
import AddTask from "./AddTask";
import ListTask from "./ListTask";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import "./ToDo.css";

const ToDo = () => {
  const [tasks, setTasks] = useState([
    {title: "Task 1"},
    {title: "Task 2"}
  ]);

  const addTask = (title) => {
    const newTask = [...tasks, { title }];
    setTasks(newTask);
  };

  const deleteTask = (index) => {
    const newTask = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask);
  };
  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">ToDo</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">About</Nav.Link>
              <Nav.Link href="#pricing">Contact</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      <div className="todo-container">
        <div className="header">ToDo App</div>
        <div className="add-task">
          <AddTask addTask={addTask} />
        </div>
        <div className="tasks">
          {tasks.map((task, index) => (
            <ListTask
              task={task}
              deleteTask={deleteTask}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ToDo;
