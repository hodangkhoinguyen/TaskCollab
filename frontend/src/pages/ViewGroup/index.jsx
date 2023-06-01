import "./styles.css";
import group from "../../services/group.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import task from "../../services/task.js";
import commentCtrl from "../../services/comment.js";

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!props.show) {
    return null;
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleCreateTask() {
    if (title === "" || description === "") {
      alert("Please fill out information");
      return;
    }

    const newTask = {
      title: title,
      description: description,
      groupId: props.groupId,
    };

    task
      .createTask(props.user, newTask)
      .then(() => {
        props.setShowNewTask(false);
        props.updateTaskList();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="modal-container">
      <div className="new-task-container">
        <h5>Add New Task</h5>
        <label>Title:</label>
        <input
          type="text"
          onChange={handleTitleChange}
          placeholder="Task Title"
          required="required"
        />
        <label>Description:</label>
        <input
          type="text"
          onChange={handleDescriptionChange}
          placeholder="Task Description"
          required="required"
        />
        <div>
          <button className="create-task-btn" onClick={handleCreateTask}>
            Create Task
          </button>
          <button
            onClick={() => {
              props.setShowNewTask(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function AddComment(props) {
  const [content, setContent] = useState("");

  function handleTextChange(e) {
    setContent(e.target.value);
  }

  function createComment() {
    commentCtrl.createComment(props.user, {
      content: content,
      taskId: props.taskId
    })
    .then(() => {
      setContent("");
      commentCtrl.getCommentByTask(props.user, props.taskId)
      .then((comments) => {
        props.setCommentList(comments);
      });
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="add-comment">
      <textarea onChange={handleTextChange} value={content}></textarea>
      <div className="comment-btn-container">
        <button className="new-comment-btn" onClick={createComment}>Send Comment</button>
      </div>
    </div>
  );
}

function Comment(props) {
  const comment = props.comment;
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {}, [content]);

  console.log(comment);
  const author = comment.author;
  const dateCreated = new Date(comment.dateCreated).toLocaleString();

  function handleTextChange(e) {
    setEditContent(e.target.value);
  }

  function handleEditComment() {
    commentCtrl
      .updateComment(props.user, comment._id, {
        content: editContent,
      })
      .then(() => {
        setContent(editContent);
        setEdit(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="comment-container">
      <div className="comment-info">
        <span>{author.name}</span>
        <span>{dateCreated}</span>
      </div>

      {!edit ? (
        <div className="comment-content">
          {content}
          <div className="comment-content-button">
            <button
              onClick={() => {
                if (comment.author._id !== props.user.userId) {
                  alert("You are not the author of this comment");
                  return;
                }
                setEditContent(content);
                setEdit(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <div className="edit-content">
          <textarea
            onChange={handleTextChange}
            defaultValue={content}
          ></textarea>
          <div className="comment-content-button">
            <button onClick={() => setEdit(false)}>Cancel</button>
            <button onClick={handleEditComment}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskDetail(props) {
  if (!props.taskDetail) {
    return <div className="task-detail-container">No Task Chosen</div>;
  }

  const taskInfo = props.taskDetail;
  const commentList = props.commentList;

  return (
    <div className="task-detail-container">
      <div>
        <p className="task-title">{taskInfo.title}</p>
        <p className="task-description">Description: {taskInfo.description}</p>
      </div>
      <AddComment taskId={taskInfo._id} {...props}/>
      {commentList && commentList.length > 0 ? (
        <div>
          {commentList.map((comment) => {
            return <Comment {...props} key={comment._id} comment={comment} />;
          })}
        </div>
      ) : (
        <div>There is no comment so far</div>
      )}
    </div>
  );
}

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
