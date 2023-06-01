import "./styles.css";
import group from "../../services/group.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import task from "../../services/task.js";
import commentCtrl from "../../services/comment.js";


function ViewGroup(props) {
  let params = useParams();
  const [groupInfo, setGroupInfo] = useState(null);
  const [showNewTask, setShowNewTask] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    // Fetch user data from backend or API
    // Set the user data in the state
    const fetchGroupData = async () => {
      if (!props.user) return;
      try {
        const getGroups = await group.getGroupById(props.user, params.groupId);
        const getTaskList = await task.getTaskByGroup(
          props.user,
          params.groupId
        );

        setGroupInfo(getGroups);
        setTaskList(getTaskList);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchGroupData();
  }, [props.user, params.groupId]);

  useEffect(() => {
    const fetchTaskData = async () => {
      if (!props.user || !taskId) return;
      const taskDetail = await task.getTaskById(props.user, taskId);
      const getCommentList = await commentCtrl.getCommentByTask(
        props.user,
        taskId
      );

      setCurrentTask(taskDetail);
      setCommentList(getCommentList);
    };

    fetchTaskData();
  }, [props.user, taskId]);

  useEffect(() => {

  }, [commentList]);

  async function updateTaskList() {
    const getTaskList = await task.getTaskByGroup(props.user, params.groupId);
    setTaskList(getTaskList);
  }

  function displayNewTask() {
    setShowNewTask(true);
  }

  return groupInfo ? (
    <div>
      Group {groupInfo.name}
      <div className="new-task-btn-container">
        <button className="new-task-btn" onClick={displayNewTask}>
          Create New Task
        </button>
        <a className="new-task-btn" href={`/group/${params.groupId}/manage-user`}>
          Manage User
        </a>
      </div>
      <div className="group-container">
        <div className="task-container">
          {taskList || taskList.length > 0 ? (
            <div>
              {taskList.map((task) => (
                <button
                  className="task-item"
                  key={task._id}
                  onClick={() => setTaskId(task._id)}
                >
                  <p className="task-title">{task.title}</p>
                  <p className="task-description">
                    Description: {task.description}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div>There is currently no task</div>
          )}
        </div>
        <TaskDetail setCommentList={setCommentList} taskDetail={currentTask} commentList={commentList} {...props}/>
      </div>
      <AddTask
        groupId={params.groupId}
        updateTaskList={updateTaskList}
        user={props.user}
        setShowNewTask={setShowNewTask}
        show={showNewTask}
      />
    </div>
  ) : (
    <div>Loading Group...</div>
  );
}

export default ViewGroup;
