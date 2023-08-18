import API from "./api.js";

const Store = {
    tasks: [],
    filteredTasks: [],
};

export const loadTasks = async () => {
    try {
        const results = await API.fetchTasks();
        Store.tasks = results.reverse();
    } catch (error) {
        return error;
    }
}

export const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    const searchQuery = searchBar.value;

    const searchDateInput = document.getElementById("search-date");
    const searchDate = searchDateInput.value;

    if (!searchQuery && !searchDate) {
        return window.dispatchEvent(new Event("renderlisttasks"));
    }

    const tasksToFilter = Store.filteredTasks > 0 ? Store.filteredTasks : Store.tasks;

    const filteredTasks = tasksToFilter.filter((task) =>
        task.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    Store.filteredTasks = filteredTasks;
    window.dispatchEvent(new Event("searchlisttask"));
}

export const handleSearchDate = () => {
    const searchDateInput = document.getElementById("search-date");
    const searchDate = searchDateInput.value;

    const searchBar = document.getElementById("search-bar");
    const searchQuery = searchBar.value;

    if (!searchQuery && !searchDate) {
        return window.dispatchEvent(new Event("renderlisttasks"));
    }

    const formatSearchDate = new Date(searchDateInput.value).toDateString();
    const tasksToFilter = Store.filteredTasks > 0 ? Store.filteredTasks : Store.tasks;

    const filteredTasks = tasksToFilter.filter((task) => {
        const taskDate = new Date(task.start_date).toDateString();

        return taskDate === formatSearchDate;
    });

    Store.filteredTasks = filteredTasks;
    window.dispatchEvent(new Event("searchlisttask"));
}

export const todayDate = () => {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    document.getElementById('dateDisplay').textContent = formattedDate;
}

export default Store;