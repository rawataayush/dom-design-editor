import { createRectangle, createText } from "./elements/create.js";
import { selectElementById, clearElementSelection } from "./elements/select.js";

import "./elements/drag.js";
import "./elements/resize.js";

import { isInteractionActive } from "./state/interaction.js";
import { 
    getSelectedElementId,
    clearSelection,
    removeElement, 
    loadFromLocalStorage, 
    saveToLocalStorage
} from "./state/store.js";

import { renderCanvas } from "./canvas/render.js";
import { renderLayers } from "./panels/layer.js";

import { exportJSON } from "./utils/export.js";
import { exportHTML } from "./utils/exportHtml.js";

// DOM REFERENCES
const canvas = document.getElementById('canvas');
const rectBtn = document.getElementById("add-rect-btn")
const textBtn = document.getElementById('add-text-btn');
const circleBtn = document.getElementById("add-circle-btn");
const exportJsonBtn = document.getElementById("export-json-btn");
const exportHtmlBtn = document.getElementById("export-html-btn");


// TOOLBAR ACTIONS
rectBtn.addEventListener('click', createRectangle);
textBtn.addEventListener('click', createText);

// Circle intenionally disabled
circleBtn.disabled = true;
circleBtn.title = "Coming soon";

// CANVAS SELECTION 
canvas.addEventListener('mousedown', (e)=> {
    if (isInteractionActive()) return;
    
    if(e.target.classList.contains("editor-element")){
        selectElementById(e.target.dataset.id);
    } else if(e.target === canvas){
        clearElementSelection();
    }
});

// EXPORT ACTIONS
exportJsonBtn.addEventListener("click", exportJSON);
exportHtmlBtn.addEventListener("click", exportHTML);

// KEYWORD CONTROLS

document.addEventListener("keydown", (e) => {
    const selectedId = getSelectedElementId();
    if(!selectedId) return;

    if(e.key === "Delete" || e.key === "Backspace") {
        removeElement(selectedId);
        clearSelection();
        saveToLocalStorage();
        renderCanvas();
        renderLayers();
    }
})

// INITIAL LOAD

function renderAll () {
    loadFromLocalStorage();
    renderCanvas();
    renderLayers();
}

renderAll();