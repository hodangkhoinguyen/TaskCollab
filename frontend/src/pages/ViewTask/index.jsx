import React, { useEffect, useState } from 'react';
import task from '../../services/task';
import './styles.css';

function TaskPage({ user, groupId }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: '' });

  useEffect(() => {
    fetchTasks();
  }, [user, groupId]);

  async function fetchTasks() {
    const fetchedTasks = await task.getTaskByGroup(user, groupId);
    setTasks(fetchedTasks);
  }

  async function handleCreateTask(e) {
    e.preventDefault();
    const createdTask = await task.createTask(user, newTask);
    setTasks([...tasks, createdTask]);
    setNewTask({ title: '', description: '', status: '' });
  }

  async function handleUpdateTask(e) {
    e.preventDefault();
    const updatedTask = await task.updateTask(user, selectedTask._id, newTask);
    const updatedTasks = tasks.map(task => task._id === updatedTask._id ? updatedTask : task);
    setTasks(updatedTasks);
    setNewTask({ title: '', description: '', status: '' });
    setSelectedTask(null);
  }

  async function handleDeleteTask(taskId) {
    await task.deleteTask(user, taskId);
    const remainingTasks = tasks.filter(task => task._id !== taskId);
    setTasks(remainingTasks);
  }

  async function handleSelectTask(taskId) {
    const fetchedTask = await task.getTaskById(user, taskId);
    setSelectedTask(fetchedTask);
    setNewTask(fetchedTask);
  }

  return (
    <div className="task-page">
      <h1>Tasks</h1>
      <form onSubmit={selectedTask ? handleUpdateTask : handleCreateTask} className="task-form">
        <input
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Title"
          className="task-input"
        />
        <textarea
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
          className="task-input"
        />
        <input
          value={newTask.status}
          onChange={e => setNewTask({ ...newTask, status: e.target.value })}
          placeholder="Status"
          className="task-input"
        />
        <button type="submit" className="task-button">
          {selectedTask ? 'Update task' : 'Create task'}
        </button>
        {selectedTask && <button onClick={() => setSelectedTask(null)} className="task-button">Cancel</button>}
      </form>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <button onClick={() => handleSelectTask(task._id)} className="task-button">Edit</button>
            <button onClick={() => handleDeleteTask(task._id)} className="task-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;