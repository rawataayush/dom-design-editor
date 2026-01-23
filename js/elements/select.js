import { renderCanvas } from "../canvas/render.js";
import { renderLayers } from "../panels/layer.js";
import { renderProperties } from "../panels/properties.js";
import { clearSelection, setSelectedElementId, bringToFront } from "../state/store.js";

function selectElementById(id) {
    bringToFront(id);
    setSelectedElementId(id);
    renderCanvas();
    renderLayers();
    renderProperties();
}

function clearElementSelection(){
    clearSelection();
    renderCanvas();
    renderLayers();
    renderProperties();
}

export{selectElementById, clearElementSelection};