import React, { useState } from "react";
import group from "../../services/group.js";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const MakeNewGroup = () => {
    const [name, setName] = useState("");
    const [user, getUser] = useState("");
    
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
      const handleUserChange = (event) => {
        getUser(event.target.value);
      };

};
export default MakeNewGroup;