import "./styles.css";
import group from "../../services/group.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AddUser(props) {
  const [email, setEmail] = useState("");

  if (!props.show) {
    return null;
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleAddMember() {
    if (email === "") {
      alert("Please fill out information");
      return;
    }

    group.addMemberByEmail(props.user, props.groupId, email)
      .then(() => {
        props.setShowNewMember(false);
        props.updateMemberList();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="modal-container">
      <div className="new-task-container">
        <h5>Add New User</h5>
        <label>Title:</label>
        <input
          type="text"
          onChange={handleEmailChange}
          placeholder="New Member Email"
          required="required"
        />
        <div>
          <button className="create-task-btn" onClick={handleAddMember}>
            Add
          </button>
          <button
            onClick={() => {
              props.setShowNewMember(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function RemoveUser(props) {
  if (!props.show) {
    return null;
  }

  const member = props.member;
  function handleRemoveMember() {
    group.removeMemberByEmail(props.user, props.groupId, member.email)
    .then( () => {
      props.setShowRemoveMember(false);
      props.updateMemberList();
    }
    )
    .catch(e => console.log(e));
  }

  return (
    <div className="modal-container">
      <div className="new-task-container">
        <h5>Remove User</h5>
        <label>Are you sure to remove {member.name}:</label>
        <div>
          <button className="remove-user-btn" onClick={handleRemoveMember}>
            Yes
          </button>
          <button className="remove-user-btn"
            onClick={() => {
              props.setShowRemoveMember(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}



function ViewUser(props) {
  let params = useParams();
  const [groupInfo, setGroupInfo] = useState(null);
  const [showNewMember, setShowNewMember] = useState(false);
  const [showRemoveMember, setShowRemoveMember] = useState(false);
  const [removedMember, setRemovedMember] = useState(null);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    // Fetch user data from backend or API
    // Set the user data in the state
    const fetchGroupData = async () => {
      if (!props.user) return;
      try {
        const getGroups = await group.getGroupById(props.user, params.groupId);
        const getMemberList = await group.getMembers(props.user, params.groupId);
        console.log(getMemberList)
        setGroupInfo(getGroups);
        setMemberList(getMemberList);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchGroupData();
  }, [props.user, params.groupId]);

  async function updateMemberList() {
    const getMemberList = await group.getMembers(props.user, params.groupId);
    setMemberList(getMemberList);
  }

  function displayNewMember() {
    setShowNewMember(true);
  }

  function handleRemoveUser(member) {
    setRemovedMember(member);
    setShowRemoveMember(true);
  }

  return groupInfo ? (
    <div>
      Group {groupInfo.name}
      <div className="new-task-btn-container">
        <button className="new-task-btn" onClick={displayNewMember}>
          Add New User
        </button>
      </div>
      <div className="group-container">
        <div className="task-container">
          {memberList || memberList.length > 0 ? (
            <div>
              {memberList.map((member) => (
                <div
                  className="user-item"
                  key={member.memberId}
                >
                  <p className="member-title">{member.name}</p>
                  <p className="member-title">{member.email}</p>
                  <button className="remove-button" onClick={() => {
                    handleRemoveUser(member);
                  }}>X</button>
                </div>
              ))}
            </div>
          ) : (
            <div>There is currently no member</div>
          )}
        </div>
      </div>
      <AddUser
        groupId={params.groupId}
        updateMemberList={updateMemberList}
        user={props.user}
        setShowNewMember={setShowNewMember}
        show={showNewMember}
      />
      <RemoveUser
        groupId={params.groupId}
        updateMemberList={updateMemberList}
        user={props.user}
        member={removedMember}
        setShowRemoveMember={setShowRemoveMember}
        show={showRemoveMember}
      />
    </div>
  ) : (
    <div>Loading Group...</div>
  );
}

export default ViewUser;
