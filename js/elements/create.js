import { addElement, setSelectedElementId} from "../state/store.js";
import { renderCanvas } from "../canvas/render.js";
import { generateId } from "../utils/id.js";

function createRectangle() {
    let rectangleObject =  {
        id: generateId(),
        type: "rect",
        position: {x: 200, y: 120},
        size: {height: 200, width: 200},
        rotation: 0,
        styles: {backgroundColor: "#2563eb"},
        content: null
    };

    addElement(rectangleObject);
    setSelectedElementId(rectangleObject.id);

    renderCanvas();
}

function createText() {
    let textObject = {
        id: generateId(),
        type: "text",
        position: {x: 200, y: 120},
        size: {height: 20, width: 80},
        rotation: 0,
        styles: {},
        content: "Type here"
    }

    addElement(textObject);
    setSelectedElementId(textObject.id);

    renderCanvas();
}

export {createRectangle, createText};