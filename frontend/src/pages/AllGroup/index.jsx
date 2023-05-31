import "./styles.css";
import group from "../../services/group.js";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
function AllGroup(props) {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from backend or API
    // Set the user data in the state
    const fetchGroupData = async () => {
      if (!props.user) return;
      try {
        const getGroups = await group.getGroupByUser(props.user);
        console.log(getGroups);
        setGroups(getGroups);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchGroupData();
  }, [props.user]);

  return (
    <div>
      Your Groups
      <div>
        <Link to="/new-group">Create New Group</Link>
        {groups.map((group) => (
          <div
            className="group-item"
            key={group._id}
            onClick={() => {
              navigate(`/group/${group._id}`);
            }}
          >
            <p className="group-name">{group.name}</p>
            <p className="group-description">{group.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllGroup;
