window.addEventListener("load", main);

function main() {
    const startBtnEl = document.querySelector("#page-1 button");

    startBtnEl.addEventListener("click", transition.bind(null, "page-1", "page-2"));
}

function transition(startPageId, endPageId) {
    const startPageEl = document.getElementById(startPageId);
    const endPageEl = document.getElementById(endPageId);

    if (startPageEl == null) {
        throw Error(`Couldn't find start page #${startPageId}`);
    }

    if (endPageEl == null) {
        throw Error(`Couldn't find end page #${endPageId}`);
    }

    startPageEl.classList.add("hidden");
    window.setTimeout(() => {
        endPageEl.classList.remove("hidden");
    }, 1000);
}