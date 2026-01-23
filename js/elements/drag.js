import { clearSelection, getSelectedElement, updateElement } from "../state/store.js";
import { renderCanvas } from "../canvas/render.js";
import { selectElementById } from "./select.js";

let isDragActive = false;
let draggedElementId = null;

let startMouseX = 0;
let startMouseY = 0;

let startElementX = 0;
let startElementY = 0;

let deltaX = 0;
let deltaY = 0;

let newX = 0;
let newY = 0;

document.getElementById('canvas').addEventListener('mousedown', (e)=> {
    if(!canvas.contains(e.target)) return;
    const selectedElement = getSelectedElement();
    const clickedId = e.target.dataset.id;

    e.stopPropagation();
    
    isDragActive = true;
    draggedElementId = selectedElement.id;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    startElementX = selectedElement.position.x;
    startElementY = selectedElement.position.y;
})

window.addEventListener('mousemove', (e)=> {
    if(!isDragActive) return;
    deltaX = e.clientX - startMouseX;
    deltaY = e.clientY - startMouseY;

    newX = startElementX + deltaX;
    newY = startElementY + deltaY;

    updateElement(draggedElementId, {position: {x: newX, y: newY}});
    renderCanvas();
})

window.addEventListener('mouseup', (e)=> {
    if(!isDragActive) return;

    isDragActive = false;
    draggedElementId = null;
})

document.addEventListener('dragstart', (e)=> {
    e.preventDefault();
})
