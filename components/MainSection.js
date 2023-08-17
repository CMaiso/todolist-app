export default class MainSection extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });

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
    }
}

customElements.define("main-section", MainSection);