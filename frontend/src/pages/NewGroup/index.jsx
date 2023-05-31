import React, { useState } from "react";
import group from "../../services/group.js";
import "./style.css";
import { useNavigate } from "react-router-dom";

const MakeNewGroup = (props) => {
  const [name, setName] = useState("");
  const [description, getDescription] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    getDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (name === "" || description === "") {
      alert("You are missing information");
      return;
    }

    const createGroup = {
      name: name,
      description: description,
    };

    group
      .createGroup(props.user, createGroup)
      .then((result) => {
        console.log(result);
        navigate("/all-group");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="make-group-page">
      <div className="group-form">
        <div>
          <h2>Create New Group</h2>
        </div>

        <div>
          <label>Group Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Group Name"
            required="required"
          />
        </div>
        <div>
          <label>(Optional) Add Description:</label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
          />
        </div>
        <div className="go-button">
          <button onClick={handleSubmit}>Create Group</button>
        </div>
      </div>
    </div>
  );
};
export default MakeNewGroup;
