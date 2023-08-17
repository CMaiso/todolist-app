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

export const todayDate = () => {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    document.getElementById('dateDisplay').textContent = formattedDate;
}

export default Store;