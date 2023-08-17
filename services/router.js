const Router = {
    init: (addToHistory= true) => {
        const route = location.pathname;
        console.log(route);
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }
        let pageElement;
        switch (route) {
            case "/newTask":
                pageElement = document.createElement("new-task-section");
                break;
            default:
                pageElement = document.createElement("main-section");
                break;
        }
        if (pageElement) {
            const cache = document.querySelector("main");
            cache.innerHTML = "";
            cache.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;

        } else {
            // 404
            document.querySelector("main").innerHTML = "Oups, 404!"

        }
    },
}
export default Router;
