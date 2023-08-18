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
    const searchQuery = searchBar.value.toLowerCase();

    const searchDateInput = document.getElementById("search-date");
    const searchDate = searchDateInput.value;

    // If both filters are empty, render the original list
    if (!searchQuery && !searchDate) {
        Store.filteredTasks = [...Store.tasks];
        return window.dispatchEvent(new Event("renderlisttasks"));
    }

    // Filter based on both label and date
    const filteredTasks = Store.tasks.filter((task) => {
        const taskLabelMatches = task.label.toLowerCase().includes(searchQuery);
        const taskDateMatches = searchDate ? new Date(task.start_date).toDateString() === new Date(searchDate).toDateString() : true;

        return taskLabelMatches && taskDateMatches;
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