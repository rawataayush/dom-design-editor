import { getElements } from "../state/store.js";

function exportJSON() {
    const data = JSON.stringify(getElements(), null, 2);

    const blob = new Blob([data], {
        type: "application/json"
    });
    const url =  URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "design.json";
    a.click();

    URL.revokeObjectURL(url);
}

export {exportJSON};