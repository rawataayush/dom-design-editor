import { addElement, setSelectedElementId, getNextElementPosition} from "../state/store.js";
import { renderCanvas } from "../canvas/render.js";
import { generateId } from "../utils/id.js";

function createRectangle() {
    let rectangleObject =  {
        id: generateId(),
        type: "rect",
        position: getNextElementPosition(),
        size: {width: 200, height: 200},
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
        position: getNextElementPosition(),
        size: {width: 80, height: 20},
        rotation: 0,
        styles: {},
        content: "Type here"
    };

    addElement(textObject);
    setSelectedElementId(textObject.id);
    renderCanvas();
}

function createCircle() {
    let circleObject = {
        id: generateId(),
        type: "circle",
        position: getNextElementPosition,
        size: {width: 200, height: 200},
        rotation: 0,
        styles: {backgroundColor: "#2563eb", borderRadius: 50},
        content: null
    };

    addElement(circleObject);
    setSelectedElementId(circleObject.id);
    renderCanvas();
}

export {createRectangle, createText, createCircle};