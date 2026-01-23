import { getSelectedElement, updateElement, saveToLocalStorage } from "../state/store.js";
import { renderCanvas } from "../canvas/render.js";
import { isInteractionActive, startInteraction, endInteraction } from "../state/interaction.js";

let isDragging = false;
let draggedElementId = null;

let startMouseX = 0;
let startMouseY = 0;

let startElementX = 0;
let startElementY = 0;

const canvas = document.getElementById('canvas');

canvas.addEventListener('mousedown', (e)=> {
    if (isInteractionActive()) return;
    if (!e.target.classList.contains("editor-element")) return;

    e.preventDefault();
    e.stopPropagation();

    const selectedElement = getSelectedElement();
    if(!selectedElement) return;

    isDragging = true;
    startInteraction();
    draggedElementId = selectedElement.id;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    startElementX = selectedElement.position.x;
    startElementY = selectedElement.position.y;
});

window.addEventListener('mousemove', (e)=> {
    if(!isDragging) return;

    const deltaX = e.clientX - startMouseX;
    const deltaY = e.clientY - startMouseY;

    const newX = startElementX + deltaX;
    const newY = startElementY + deltaY;

    updateElement(draggedElementId, {
        position: {x: newX, y: newY}
    });

    const elem  = document.querySelector(`.editor-element[data-id="${draggedElementId}"]`
    );
    if (elem) {
        elem.style.left = newX + "px";
        elem.style.top =newY + "px";
    }
});

window.addEventListener('mouseup', ()=> {
    if(!isDragging) return;

    isDragging = false;
    draggedElementId = null;
    endInteraction();

    saveToLocalStorage();
    renderCanvas();
})

document.addEventListener('dragstart', (e)=> {
    e.preventDefault();
})
