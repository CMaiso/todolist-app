import API from "./services/api.js";
import Store, {loadTasks} from "./services/store.js";

window._app = {}
_app.store = Store;

// wait for the DOM manipulation
window.addEventListener("DOMContentLoaded", async () => {
    await loadTasks();
});