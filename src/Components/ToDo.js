import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import "./ToDo.css";

const ToDo = () => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([
    { title: "Task 1" },
    { title: "Task 2" },
  ]);

  const addItem = () => {
    value.trim() !== "" && setTasks([...tasks, { title: value }]);
    setValue("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((task) => tasks.indexOf(task) !== index));
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
        <>
          <div className="input-container">
            <input
              type="text"
              className="input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Add New Task"
            />
            <Button variant="light" onClick={addItem}>
              ADD
            </Button>
          </div>
          {tasks.map((task, index) => (
            <div className="list-task" key={index}>
              {task.title}
              <Button
                variant="danger"
                className="del-button"
                onClick={() => deleteTask(index)}
              >
                <BsTrash />
              </Button>
            </div>
          ))}
        </>
      </div>
    </>
  );
};

export default ToDo;
