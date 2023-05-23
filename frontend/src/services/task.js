import http from '../http.js';

async function createTask(user, newTask) {
    const result = await http.post('task', newTask, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function updateTask(user, taskId, newTask) {
    const result = await http.put(`task/${taskId}`, newTask, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function deleteTask(user, taskId) {
    const result = await http.delete(`task/${taskId}`, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function getTaskById(user, taskId) {
    const result = await http.get(`task/getTaskById/${taskId}`, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function getTaskByGroup(user, groupId) {
    const result = await http.post(`task/getTaskByGroup`, { groupId: groupId} ,{
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

const task = {
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getTaskByGroup
};

export default task;