import React, { useEffect, useState } from "react";
import { axios } from "../Utils/axios";
import { Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import "../App.css";

const ToDo = () => {
   const [tasks, setTasks] = useState([]);
   const [access, setAccess] = useState(false);
   const [text, setText] = useState("");

   useEffect(() => {
      const fetchtoDo = async () => {
         try {
            const response = await axios.get("/user/todo");

            if (response.status === 200) {
               setAccess(true);
               setTasks(response.data.tasks);
            }
         } catch (error) {
            console.error(error.message);
         }
      };

      fetchtoDo();
   }, []);

   const handleAddTask = async (e) => {
      if (text.trim() === "") {
         return;
      }
      try {
         const response = await axios.post("/user/todo", { task: text });
         if (response.status === 200) {
            alert("Task Added");
         }
      } catch (error) {
         alert("You don't have the required permissions");
         setText("");
      }
   };

   const handleDeleteTask = async (id) => {
      try {
         const response = await axios.delete(`/user/todo/${id}`);
         if (response.status === 200) {
            alert("Task Added");
         }
      } catch (error) {
         alert("You don't have the required permissions");
      }
   };

   return (
      <div className="container">
         {access ? (
            <div className="todo-container">
               <div className="header">ToDo List</div>
               <>
                  <div className="input-container">
                     <input
                        type="text"
                        className="input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add New Task"
                     />
                     <Button variant="light" onClick={handleAddTask}>
                        ADD
                     </Button>
                  </div>
                  {tasks.map((task) => (
                     <li className="list-task" key={task._id}>
                        {task.task}
                        <Button variant="danger" className="del-button" onClick={() => handleDeleteTask(task._id)}>
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
