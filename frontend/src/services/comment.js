import http from '../http.js';

async function createComment(user, newComment) {
    const result = await http.post('comment', newComment, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function updateComment(user, commentId, newComment) {
    const result = await http.put(`comment/${commentId}`, newComment, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function deleteComment(user, commentId) {
    const result = await http.delete(`comment/${commentId}`, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function getCommentById(user, commentId) {
    const result = await http.get(`comment/getCommentById/${commentId}`, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function getCommentByTask(user, taskId) {
    const result = await http.post(`comment/getCommentByTask`, { taskId: taskId} ,{
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

const comment = {
    createComment,
    updateComment,
    deleteComment,
    getCommentById,
    getCommentByTask
};

export default comment;