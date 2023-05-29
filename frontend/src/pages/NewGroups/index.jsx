import React, { useState } from "react";
import group from "../../services/group.js";
import "./style.css";
import { useNavigate } from "react-router-dom";

const MakeNewGroup = () => {
    const [name, setName] = useState("");
    const [user, getUser] = useState("");
    const [description, getDescription] = useState("");
    const [tags, getTags] = useState("");
    
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
    const handleUserChange = (event) => {
        getUser(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        getDescription(event.target.value);
    };

    const handleTagsChange = (event) => {
        getTags(event.target.value);
    };

    

    const handleSubmit = () => {
        if (name === "" || user === "") {
          alert("You are missing information");
          return;
        }
        const createGroup = {
            name: name,
            user: user,
        };
          group.createGroup(createGroup)
          .then((result) => {
              console.log(result);
          })
          .catch(err => console.log(err));
    };

    return (
        <div className="make-group-page">
            <div className="logo-portion">
                <h1>TaskHub</h1>
            </div>
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
                    <label>Enter Members:</label>
                    <input
                        type="text"
                        value={user}
                        onChange={handleUserChange}
                        placeholder="Users"
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
                <div>
                    <label>(Optional) Add Tags:</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={handleTagsChange}
                        placeholder="Separate tags with commas"
                    />
                </div>
                <button onClick={handleSubmit}>Create Group</button>


            </div>


        </div>
    );

};
export default MakeNewGroup;