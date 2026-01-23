import { renderCanvas } from "../canvas/render.js";
import { clearSelection, setSelectedElementId, bringToFront } from "../state/store.js";

function selectElementById(id) {
    bringToFront(id);
    setSelectedElementId(id);
    renderCanvas();
}

function clearElementSelection(){
    clearSelection();
    renderCanvas();
}

export{selectElementById, clearElementSelection};