import API from "../services/api.js";

export class NewTaskSection extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });

        const styles = document.createElement("style");
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("/components/NewTaskSection.css");
            styles.textContent = await request.text();
        }
        loadCSS();
    }

    async createNewTask(dataTask) {
        const date = new Date(); // Current date and time
        const formattedDate = date.toISOString();

            const task = {
                ...dataTask,
                start_date: formattedDate,
            };

            try {
               await API.postTask(task);
                return true;
            } catch (error) {
                console.error('Error sending data:', error);
            }
    }
    connectedCallback() {
        const template = document.getElementById("new-task-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        const form = this.root.querySelector('form');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const labelElement = this.root.querySelector('#task-label');
            const descriptionElement = this.root.querySelector('#task-description');

            const label = labelElement.value;
            const description = descriptionElement.value;

            const result = await this.createNewTask({label, description});

            if (result) {
                const successMessageElement = this.root.querySelector('#success-message');
                successMessageElement.textContent = 'Task created successfully!';
                labelElement.value = '';
                descriptionElement.value = '';
            }
        });
    }

}

customElements.define("new-task-section", NewTaskSection);