import { renderCanvas } from "../canvas/render.js";
import { clearSelection, setSelectedElementId } from "../state/store.js";

function selectElementById(id) {
    setSelectedElementId(id);
    renderCanvas();
}

function clearElementSelection(){
    clearSelection();
    renderCanvas();
}

export{selectElementById, clearElementSelection};