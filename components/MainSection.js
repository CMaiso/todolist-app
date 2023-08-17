import {loadTasks} from "../services/store.js";

export class MainSection extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"});

        const styles = document.createElement("style");
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("/components/MainSection.css");
            styles.textContent = await request.text();
        }

        loadCSS();
    }

    connectedCallback() {
        const template = document.getElementById("main-section-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        window.addEventListener("listtaskchange", async () => {
            await loadTasks();
            this.render();
        });

        this.render();
    }

    render() {
        const taskListSection = this.root.querySelector("#tasks-list");

        if (!_app.store.tasks.length) {
            taskListSection.innerHTML = `
            <p>The list is empty. Add some tasks for today!</p>
        `;
        } else {
            taskListSection.innerHTML = `
            <ul></ul>
        `;
        }

        const taskListUlElement = taskListSection.querySelector("ul");

        for (let task of _app.store.tasks) {
            const item = document.createElement("task-item");
            item.dataset.item = JSON.stringify(task);

            taskListUlElement.appendChild(item);
        }
    }
}

customElements.define("main-section", MainSection);