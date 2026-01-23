import { renderCanvas } from "../canvas/render.js";
import { renderLayers } from "../panels/layer.js";
import { clearSelection, setSelectedElementId, bringToFront } from "../state/store.js";

function selectElementById(id) {
    bringToFront(id);
    setSelectedElementId(id);
    renderCanvas();
    renderLayers();
}

function clearElementSelection(){
    clearSelection();
    renderCanvas();
}

export{selectElementById, clearElementSelection};