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

        const titles = this.querySelector(".task-list-content-title");

        titles.querySelector("h3").textContent = item.label;
        titles.querySelector("p").textContent = item.description;

        this.querySelector("#start-date").textContent = this.formatDate(item.start_date);
        if (item.end_date) {
            this.querySelector("#end-date").textContent = this.formatDate(item.end_date);
        }
    }
}

customElements.define("task-item", TaskItem);