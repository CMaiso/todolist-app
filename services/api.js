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
        } else {
            throw new Error(`Error creating task: ${response.statusText}`);
        }
    },
    deleteTask: async (label) => {
        const response = await fetch(`${API.url}/tasks/${label}`,
            {
                method: 'DELETE',
            });
        return await response.json();
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
            throw new Error(`Error updated task: ${response.statusText}`);
        }
    }
}

export default API;