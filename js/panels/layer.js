import  {
    getElements,
    getSelectedElementId,
    setSelectedElementId,
    bringToFront,
    moveLayerUp,
    moveLayerDown,
    saveToLocalStorage
} from "../state/store.js";

import { renderCanvas } from "../canvas/render.js";

const list = document.getElementById("layers-list");
const upBtn = document.getElementById("layer-up-btn");
const downBtn = document.getElementById("layer-down-btn");

function renderLayers() {
    if(!list) return;
    
    list.innerHTML = "";

    const selectedId = getSelectedElementId();
    const elements = [...getElements()].sort((a,b) => b.zIndex - a.zIndex);

    elements.forEach(elem => {
        const li = document.createElement('li');
        li.textContent =
        elem.type === "rect" ? "Rectangle" :
        elem.type === "text" ? 'Text' :
        "Element";

        li.dataset.id = elem.id;
        li.classList.add("layer-item");

        if(elem.id === selectedId) {
            li.classList.add("is-active");
        }

        li.addEventListener("click", () => {
            bringToFront(elem.id);
            setSelectedElementId(elem.id);
            renderCanvas();
            renderLayers();
        })

        list.appendChild(li);
    });
}

upBtn.addEventListener("click", () => {
    const id = getSelectedElementId();
    if (!id) return;
    moveLayerUp(id);
    saveToLocalStorage();
    renderCanvas();
    renderLayers();
});

downBtn.addEventListener("click", () => {
    const id =getSelectedElementId();
    if (!id) return;
    moveLayerDown(id);
    saveToLocalStorage();
    renderCanvas();
    renderLayers();
})

export {renderLayers};