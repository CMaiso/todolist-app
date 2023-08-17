import API from "../services/api.js";

export default class TaskItem extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"});

        const styles = document.createElement("style");
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("/components/TaskItem.css");
            styles.textContent = await request.text();
        }

        loadCSS();
    }

    formatDate(dateString) {
        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };

        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
    }

    connectedCallback() {
        const item = JSON.parse(this.dataset.item);

        const template = document.getElementById("task-item-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        const checkbox = this.root.querySelector("#task-checkbox");

        checkbox.addEventListener("change", async () => {
            if (checkbox.checked) {
                const date = new Date();
                const formattedDate = date.toISOString();
                const updatedTask = {
                    ...item,
                    end_date: formattedDate,
                };

                await API.updateTask(updatedTask);
                window.dispatchEvent(new Event("listtaskchange"));
            }
        });

        this.root.querySelector("#delete-task").addEventListener("click", async () => {
            await API.deleteTask(item.label);
            window.dispatchEvent(new Event("listtaskchange"));
        });

        this.render();
    }

    render() {
        const item = JSON.parse(this.dataset.item);
        const titles = this.root.querySelector(".task-list-content-title");

        titles.querySelector("h3").textContent = item.label;
        titles.querySelector("p").textContent = item.description;
        this.root.querySelector("#start-date").textContent = this.formatDate(item.start_date);

        const checkbox = this.root.querySelector("#task-checkbox");
        const taskListItem = this.root.querySelector(".task-list-content-title h3");
        const endDateElement = this.root.querySelector("#end-date");

        if (item.end_date) {
            endDateElement.textContent = this.formatDate(item.end_date);
            taskListItem.classList.add("task-done");
            checkbox.checked = true;
            checkbox.disabled = true;
        }
    }
}

customElements.define("task-item", TaskItem);