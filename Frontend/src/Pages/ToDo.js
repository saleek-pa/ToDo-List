import React, { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import "../App.css";

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
            tasks: state.tasks.filter((task) => state.tasks.indexOf(task) !== action.payload),
         };

      default:
         return state;
   }
};

const ToDo = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [permission, setPermission] = useState([]);
   const permissionId = localStorage.getItem("permissionId");

   useEffect(() => {
      const checkPermission = async () => {
         const response = await fetch("http://localhost:4000/permission", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ permissionId }),
         });

         if (response.status === 200) {
            const responseData = await response.json();
            setPermission(responseData.permission);
         }
      };

      checkPermission();
   }, [permissionId]);

   const handleAddTask = () => {
      if (permission.create) dispatch({ type: "ADD-TASK" });
      else alert("You dont have permission");
   };

   const handleDeleteTask = (index) => {
      permission.delete ? dispatch({ type: "DEL-TASK", payload: index }) : alert("You dont have permission");
   };

   return (
      <div className="container">
         {permission.read ? (
            <div className="todo-container">
               <div className="header">ToDo List</div>
               <>
                  <div className="input-container">
                     <input
                        type="text"
                        className="input"
                        value={state.value}
                        onChange={(e) => dispatch({ type: "SET-VALUE", payload: e.target.value })}
                        placeholder="Add New Task"
                     />
                     <Button variant="light" onClick={handleAddTask}>
                        ADD
                     </Button>
                  </div>
                  {state.tasks.map((task, index) => (
                     <li className="list-task" key={index}>
                        {task.title}
                        <Button variant="danger" className="del-button" onClick={() => handleDeleteTask(index)}>
                           <BsTrash />
                        </Button>
                     </li>
                  ))}
               </>
            </div>
         ) : (
            <div>
               <h1 className="text-white">Unauthorized</h1>
            </div>
         )}
      </div>
   );
};

export default ToDo;
