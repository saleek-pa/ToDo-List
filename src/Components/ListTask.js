import React from "react";
import { Button } from "react-bootstrap";

const ListTask = ({ task, index, deleteTask }) => {
  return (
    <>
      <div className="list-task">
        {task.title}
        <Button variant="danger" className="del-button" onClick={()=>{deleteTask(index)}}>
          Delete
        </Button>
      </div>
    </>
  );
};

export default ListTask;
