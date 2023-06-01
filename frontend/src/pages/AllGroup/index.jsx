import "./styles.css";
import group from "../../services/group.js";
import { useState, useEffect } from "react";
function AllGroup(props) {
  const [groups, setGroups] = useState([]);

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
        <a className="view-group" href="/new-group">Create New Group</a>
        {groups.map((group) => (
          <a
            className="group-item"
            key={group._id}
            href={`/group/${group._id}`}
          >
            <p className="group-name">{group.name}</p>
            <p className="group-description">{group.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default AllGroup;
