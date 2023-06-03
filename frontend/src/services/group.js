import http from '../http.js';

async function createGroup(user, newGroup) {
    const result = await http.post('group', newGroup, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function updateGroup(user, groupId, newGroup) {
    const result = await http.put(`group/${groupId}`, newGroup, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function deleteGroup(user, groupId) {
    const result = await http.delete(`group/${groupId}`, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function getGroupById(user, groupId) {
    const result = await http.get(`group/getGroupById/${groupId}`, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function getGroupByUser(user) {
    const result = await http.get(`group/getGroupByUser`, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function getMembers(user, groupId) {
    const result = await http.get(`group/getMembers/${groupId}`, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function addMemberByEmail(user, groupId, email) {
    const result = await http.post(`group/addMemberByEmail`, 
    {
        groupId: groupId,
        email: email
    },
    {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

async function removeMemberByEmail(user, groupId, email) {
    const result = await http.post(`group/removeMemberByEmail`, 
    {
        groupId: groupId,
        email: email
    },
    {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

const group = {
    createGroup,
    updateGroup,
    deleteGroup,
    getGroupById,
    getGroupByUser,
    getMembers,
    addMemberByEmail,
    removeMemberByEmail
};

export default group;