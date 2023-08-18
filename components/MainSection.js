import {handleSearch, loadTasks} from "../services/store.js";

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

        document.getElementById("new-task").addEventListener("click", (event) => {
            const link = event.target;
            if (window.location.pathname === "/newTask") {
                document.querySelector(".search-form").style.display = 'none';
                link.textContent = "< Back";
                link.href = "/";
            } else {
                document.querySelector(".search-form").style.display = 'flex';
                link.textContent = "+ New Task";
                link.href = "/newTask";
            }
        });

        const searchBar = document.getElementById("search-bar");
        const searchDateInput = document.getElementById("search-date");
        searchBar.addEventListener("input", handleSearch);
        searchDateInput.addEventListener("input", handleSearch);

        window.addEventListener("renderlisttasks", async () => {
            this.render();
        });

        window.addEventListener("searchlisttask", async () => {
            this.renderListSearch();
        });

        this.render();
    }

    render() {
        const taskListSection = this.root.querySelector("#tasks-list");

        if (!_app.store.tasks.length) {
            taskListSection.innerHTML = `
            <p>The list is empty, add some tasks today!</p>
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

    renderListSearch() {
        const taskListSection = this.root.querySelector("#tasks-list");

        if (!_app.store.filteredTasks.length) {
            taskListSection.innerHTML = `
            <p>No match found. Try another research</p>
        `;
        } else {
            taskListSection.innerHTML = `
            <ul></ul>
        `;
        }

        const taskListUlElement = taskListSection.querySelector("ul");

        for (let task of _app.store.filteredTasks) {
            const item = document.createElement("task-item");
            item.dataset.item = JSON.stringify(task);

            taskListUlElement.appendChild(item);
        }
    }
}

customElements.define("main-section", MainSection);