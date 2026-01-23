import { createRectangle, createText, createCircle } from "./elements/create.js";
import { selectElementById, clearElementSelection } from "./elements/select.js";
import "./elements/drag.js";

document.getElementById("add-rect-btn").addEventListener('click', createRectangle);
document.getElementById('add-text-btn').addEventListener('click', createText);
document.getElementById('add-circle-btn').addEventListener('click', createCircle);
document.getElementById('canvas').addEventListener('mousedown', (e)=> {
    if(e.target.classList.contains("editor-element")){
        selectElementById(e.target.dataset.id);
    } else if(e.target === canvas){
        clearElementSelection();
    }
});

initDrag();