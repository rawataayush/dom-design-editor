import { createRectangle, createText } from "./elements/create.js";
import { selectElementById, clearElementSelection } from "./elements/select.js";
import "./elements/drag.js";
import "./elements/resize.js";
import { isInteractionActive } from "./state/interaction.js";
import { renderLayers } from "./panels/layer.js";
import { renderCanvas } from "./canvas/render.js";
import { loadFromLocalStorage, saveToLocalStorage } from "./state/store.js";

document.getElementById("add-rect-btn").addEventListener('click', createRectangle);
document.getElementById('add-text-btn').addEventListener('click', createText);

// Temporarily disabled
// document.getElementById('add-circle-btn').addEventListener('click', createCircle);
const circleBtn = document.getElementById("add-circle-btn");

circleBtn.disabled = true;
circleBtn.title = "Coming soon";

const canvas = document.getElementById('canvas');
canvas.addEventListener('mousedown', (e)=> {
    if (isInteractionActive()) return;
    
    if(e.target.classList.contains("editor-element")){
        selectElementById(e.target.dataset.id);
    } else if(e.target === canvas){
        clearElementSelection();
    }
});



function renderAll () {
    loadFromLocalStorage();
    renderCanvas();
    renderLayers();
}

renderAll();