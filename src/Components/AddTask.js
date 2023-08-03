import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

const AddTask = ({addTask}) => {
    const [value, setValue] = useState("")

    const addItem = () => {
        addTask(value);
        setValue("")
    }
  return (
    <>
      <div className="input-container">
        <input
          type="text"
          className="input"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          placeholder="Add New Task"
        />
        {/* <button className="add-button">Add</button> */}
        <Button variant="light" onClick={addItem} >Add</Button>
      </div>
    </>
  );
};

export default AddTask;
