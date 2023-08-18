const API = {
    url: "http://127.0.0.1:9000/v1",
    fetchTasks: async () => {
        const result = await fetch(`${API.url}/tasks`);
        return await result.json();
    },
    fetchSpecificTasks: async (label) => {
        const result = await fetch(`${API.url}/tasks/${label}`);
        return await result.json();
    },
    postTask: async (task) => {
        const response = await fetch(`${API.url}/tasks`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task),
            });
        if (response.ok) {
            console.log('Task created successfully');
            return response.ok;
         } if (response.status === 409) {
            return { error: 'Conflict: The task already exists.' };
        }
        else {
            return { error: 'An unexpected error occurred.' }
        }
    },
    deleteTask: async (label) => {
        const response = await fetch(`${API.url}/tasks/${label}`,
            {
                method: 'DELETE',
            });
        if (response.ok) {
            console.log('Task deleted successfully');
            return response.ok;
        } else {
            return { error: 'An unexpected error occurred.' }
        }
    },
    updateTask: async (task) => {
        const response = await fetch(`${API.url}/tasks/${task?.label}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task),
            });
        if (response.ok) {
            console.log('Task updated successfully');
            return response.ok;
        } else {
            return { error: 'An unexpected error occurred.' }
        }
    }
}

export default API;