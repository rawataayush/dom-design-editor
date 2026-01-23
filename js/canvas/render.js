import { getElements, getSelectedElementId, saveToLocalStorage, updateElement } from "../state/store.js";

const canvas = document.getElementById("canvas");
const propertiesPanel = document.querySelector('.properties');

function clearCanvas() {
    canvas.innerHTML = "";
}

function createElementNode(element) {
    const elem = document.createElement('div');

    elem.classList.add('editor-element');
    elem.dataset.id = element.id;
    elem.dataset.type = element.type;
    elem.draggable = false;

    // position
    elem.style.left = element.position.x + 'px';
    elem.style.top = element.position.y + 'px';

    // size
    elem.style.width = element.size.width + 'px';
    elem.style.height = element.size.height + 'px';

    // Rotation
    elem.style.transform = `rotate(${element.rotation}deg)`;
    elem.style.zIndex = element.zIndex;
    
    // Styles
    if (element.styles?.backgroundColor) elem.style.backgroundColor = element.styles.backgroundColor;
    if (element.styles?.borderRadius) elem.style.borderRadius = element.styles.borderRadius + '%';

    //Text Element
    if(element.type === 'text') {
        elem.textContent = element.content || "";

        elem.addEventListener("blur", ()=> {
            updateElement(element.id, {content: elem.textContent});
            saveToLocalStorage();
            renderCanvas();
        });
    }

    if (element.type === "text" && element.styles?.fontSize) {
        elem.style.fontSize = element.styles.fontSize + "px";
    }

    const selectId = getSelectedElementId();
    if (selectId === element.id) {
        elem.classList.add("is-selected");

        ["tl", "tr", "bl", "br"].forEach(corner => {
            const handle = document.createElement('div');
            handle.classList.add("resize-handle");
            handle.dataset.corner = corner;
            elem.appendChild(handle);
        });
    }
    return elem;
}

function renderCanvas() {
    clearCanvas();

    const selectId = getSelectedElementId();

    if (!selectId) {
        propertiesPanel.classList.add("is-disabled");
    } else {
        propertiesPanel.classList.remove("is-disabled");
    }

    const elements = getElements();
    elements.forEach(element => {
        canvas.appendChild(createElementNode(element));
    })
}

export {renderCanvas};