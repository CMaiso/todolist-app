const Router = {
    init: () => {
        document.querySelectorAll(".link").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                const url = event.target.getAttribute("href");
                Router.go(url);
            });
        })
        // Event Handler for URL changes
        window.addEventListener("popstate", event => {
            Router.go(event.state.route, false);
        });

        // Check the initial URL
        Router.go(location.pathname);
    },
    go: (route, addToHistory= true) => {
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
