import API from "../services/api.js";

export default class TaskItem extends HTMLElement {
    constructor() {
        super();
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
        this.appendChild(content);

        const checkbox = this.querySelector("#task-checkbox");
        const taskListItem = this.querySelector(".task-list-content-title h3");
        const endDateElement = this.querySelector("#end-date");

        checkbox.addEventListener("change", async () => {
            if (checkbox.checked) {
                const date = new Date();
                const formattedDate = date.toISOString();
                const updatedTask = {
                    ...item,
                    end_date: formattedDate,
                };

                await API.updateTask(updatedTask);

                taskListItem.classList.add("task-done");
                endDateElement.textContent = formattedDate;
                checkbox.disabled = true;
            }
        });

        const titles = this.querySelector(".task-list-content-title");

        titles.querySelector("h3").textContent = item.label;
        titles.querySelector("p").textContent = item.description;
        this.querySelector("#start-date").textContent = this.formatDate(item.start_date);

        if (item.end_date) {
            endDateElement.textContent = this.formatDate(item.end_date);
            taskListItem.classList.add("task-done");
            checkbox.checked = true;
            checkbox.disabled = true;
        }

    }
}

customElements.define("task-item", TaskItem);