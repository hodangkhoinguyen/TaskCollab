import "./styles.css";
import group from "../../services/group.js";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
function ViewGroup(props) {
  let params = useParams();
  console.log(params.groupId);
  const [groupInfo, setGroupInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from backend or API
    // Set the user data in the state
    const fetchGroupData = async () => {
      if (!props.user) return;
      try {
        const getGroups = await group.getGroupById(props.user, params.groupId);
        console.log(getGroups);
        setGroupInfo(getGroups);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchGroupData();
  }, []);

  useEffect(() => {
    
  })

  return (
    <div>
      Group {group.name}
      <div>
        <Link to="/new-group">Create New Group</Link>
      </div>
    </div>
  );
}

export default ViewGroup;
