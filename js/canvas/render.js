import { getElements, getSelectedElementId } from "../state/store.js";

const canvas = document.getElementById("canvas");
const propertiesPanel = document.querySelector('.properties');

function clearCanvas() {
    canvas.innerHTML = "";
}

function createElementNode(element) {
    let elem = document.createElement('div');

    elem.classList.add('editor-element');
    elem.dataset.id = element.id;
    elem.draggable = false;

    // position
    elem.style.position = "absolute";
    elem.style.left = element.position.x + 'px';
    elem.style.top = element.position.y + 'px';

    // size
    elem.style.width = element.size.width + 'px';
    elem.style.height = element.size.height + 'px';

    // Rotation
    elem.style.transform = `rotate(${element.rotation}deg)`;

    // Styles
    if (element.styles?.backgroundColor) elem.style.backgroundColor = element.styles.backgroundColor;
    if (element.styles?.borderRadius) elem.style.borderRadius = element.styles.borderRadius + '%';

    //Text Element
    if(element.type === 'text') {
        elem.textContent = element.content || "";
    }

    const selectId = getSelectedElementId();
    if(selectId === element.id) elem.classList.add('is-selected');

    if (!selectId) {
        propertiesPanel.classList.add('is-disabled');
    } else {
        propertiesPanel.classList.remove('is-disabled');
    }

    return elem;
}

function renderCanvas() {
    clearCanvas();

    const elements =getElements();

    elements.forEach(element => {
        const node = createElementNode(element);
        canvas.appendChild(node);
    })
}

export {renderCanvas};