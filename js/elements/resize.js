import { getSelectedElement, updateElement, saveToLocalStorage } from "../state/store.js";
import { renderCanvas } from "../canvas/render.js";
import { startInteraction, endInteraction, isInteractionActive } from "../state/interaction.js";

let isResizing = false;
let resizeCorner = null;

let startMouseX = 0;
let startMouseY = 0;

let startWidth = 0;
let startHeight = 0;

let startX = 0;
let startY = 0;

document.addEventListener('mousedown', (e) => {
    if (!e.target.classList.contains("resize-handle")) return;

    e.preventDefault();
    e.stopPropagation();

    const selectedElement = getSelectedElement();
    if (!selectedElement) return;

    startInteraction();
    isResizing = true;
    resizeCorner = e.target.dataset.corner;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    startWidth = selectedElement.size.width;
    startHeight = selectedElement.size.height;

    startX = selectedElement.position.x;
    startY = selectedElement.position.y;
})

window.addEventListener('mousemove', (e) => {
    if(!isResizing) return;

    const selectedElement = getSelectedElement();
    if (!selectedElement) return;

    const deltaX = e.clientX - startMouseX;
    const deltaY = e.clientY - startMouseY;

    let newWidth = startWidth;
    let newHeight = startHeight;
    let newX = startX;
    let newY = startY;

    switch (resizeCorner) {
        case "br":
            newWidth =startWidth + deltaX;
            newHeight = startHeight + deltaY;
            break;
        
        case "bl":
            newWidth = startWidth - deltaX;
            newHeight = startHeight + deltaY;
            newX = startX + deltaX;
            break;

        case "tr":
            newWidth = startWidth + deltaX;
            newHeight = startHeight - deltaY;
            newY = startY + deltaY;
            break;

        case "tl":
            newWidth = startWidth -deltaX;
            newHeight = startHeight - deltaY;
            newX = startX + deltaX;
            newY = startY + deltaY;
            break;
    }

    const MIN_SIZE = 20;

    if (newWidth < MIN_SIZE) {
        newWidth = MIN_SIZE;
        if (resizeCorner === "tl" || resizeCorner === "bl") {
            newX = startX + (startWidth - MIN_SIZE);
        }
    }

    if (newHeight <MIN_SIZE) {
        newHeight = MIN_SIZE;
        if (resizeCorner === "tl" || resizeCorner === "tr") {
            newY = startY + (startHeight - MIN_SIZE);
        }
    }

    updateElement(selectedElement.id, {
        size: {
            width: newWidth,
            height: newHeight
        },
        position: {
            x: newX,
            y: newY
        }
    });
    const elem = document.querySelector(`.editor-element[data-id="${selectedElement.id}"]`
);
if (elem) {
    elem.style.width= newWidth + "px";
    elem.style.height= newHeight + "px";
    elem.style.left= newX + "px";
    elem.style.top = newY + "px";
}
});

window.addEventListener('mouseup', ()=> {
    if (!isResizing) return;

    isResizing = false;
    resizeCorner = null;
    endInteraction();
    saveToLocalStorage();
    renderCanvas();
});