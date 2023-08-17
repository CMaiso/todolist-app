import Router from "./services/router.js";
import Store, {loadTasks, todayDate} from "./services/store.js";

import NewTaskSection from "./components/NewTaskSection.js";
import MainSection from "./components/MainSection.js";

window._app = {}
_app.store = Store;
_app.router = Router;

// wait for the DOM manipulation
window.addEventListener("DOMContentLoaded", async () => {
    await loadTasks();
    todayDate();
    _app.router.init();
});