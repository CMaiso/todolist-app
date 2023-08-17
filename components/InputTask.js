export default class InputTask extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });

        const styles = document.createElement("style");
        this.root.appendChild(styles);

        // async function loadCSS() {
        //     const request = await fetch("/components/InputTask.css");
        //     styles.textContent = await request.text();
        // }
        // loadCSS();
    }
    connectedCallback() {
        const template = document.getElementById("input-task-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);
    }
}

customElements.define("input-task", InputTask);