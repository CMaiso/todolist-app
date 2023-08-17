import {handleSearch} from "../services/store";

export class SearchSection extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"});

        const styles = document.createElement("style");
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("/components/SearchSection.css");
            styles.textContent = await request.text();
        }

        loadCSS();
    }

    connectedCallback() {
        const template = document.getElementById("search-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        const searchBar = document.getElementById("search-bar");
        searchBar.addEventListener("input", handleSearch);

        this.render();
    }

    render() {
        const taskListSection = this.root.querySelector("#search-tasks-list");

        if (!_app.store.filteredTasks.length) {
            taskListSection.innerHTML = `
            <p>The list is empty. Add some tasks for today!</p>
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

customElements.define("search-section", SearchSection);