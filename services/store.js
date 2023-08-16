import API from "./api.js";

const Store = {
    tasks: [],
};

export const loadTasks = async () => {
    try {
        Store.tasks = await API.fetchTasks();
    } catch (error) {
        return error;
    }
}

export default Store;