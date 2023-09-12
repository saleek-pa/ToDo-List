import React, { useReducer } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import "./ToDo.css";

const initialState = {
  value: "",
  tasks: [{ title: "Task 1" }, { title: "Task 2" }],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET-VALUE":
      return { ...state, value: action.payload };
    case "ADD-TASK":
      if (state.value.trim() !== "") {
        return {
          ...state,
          tasks: [...state.tasks, { title: state.value }],
          value: "",
        };
      }
      return state;
    case "DEL-TASK":
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => state.tasks.indexOf(task) !== action.payload
        ),
      };
    default:
      return state;
  }
};

const ToDo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
              value={state.value}
              onChange={(e) =>
                dispatch({ type: "SET-VALUE", payload: e.target.value })
              }
              placeholder="Add New Task"
            />
            <Button
              variant="light"
              onClick={() => dispatch({ type: "ADD-TASK" })}
            >
              ADD
            </Button>
          </div>
          {state.tasks.map((task, index) => (
            <li className="list-task" key={index}>
              {task.title}
              <Button
                variant="danger"
                className="del-button"
                onClick={() => {
                  dispatch({ type: "DEL-TASK", payload: index });
                }}
              >
                <BsTrash />
              </Button>
            </li>
          ))}
        </>
      </div>
    </>
  );
};

export default ToDo;
